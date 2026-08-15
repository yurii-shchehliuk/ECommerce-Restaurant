# Architecture notes

Companion to the [README](../README.md). This is the longer version: what the
projects are, why the boundaries fall where they do, and where the design is
deliberate versus where it is unfinished.

Everything here was checked against the source. Where something is not wired up,
it says so.

---

## 1. Solution layout

`Owlet.sln`, 10 projects, all targeting `net6.0`.

```
src/
  API.Identity/          host — registration, sign-in, token issuance
  API.Basket/            host — basket, payments, orders
  API.Web/               host — Angular SPA
  API.Admin/             host — product administration (partial)

  WebApi.Domain/         entities, DTOs, interfaces, specifications, CQRS markers
  WebApi.Infrastructure/ services + startup extensions shared by all four hosts
  WebApi.Db.Identity/    AppIdentityDbContext, identity seeding
  WebApi.Db.Store/       StoreContext (EF Core) and BasketContext (Redis), seed data
  EventBus.Messages/     RabbitMQ publisher/consumers — not referenced by any host

  nginx/                 reverse proxy container
tests/
  WebApi.Test/           xUnit
docker/                  Compose files (expect to run from the repository root)
sql/                     SQL Server container Dockerfile
build/                   migration and helper batch scripts
```

### Why the hosts are thin

The four API projects contain almost no cross-cutting code. Authentication,
Swagger, AutoMapper, the generic repository and the unit of work are all registered
through `IServiceCollection` extensions in `WebApi.Infrastructure`:

| Extension | File | Used by |
|---|---|---|
| `AddCommonIdentity` | `StartupExtensions/CommonExtensions.cs` | Basket, Admin |
| `AddSwaggerDocumentation` / `UseSwaggerDocumention` | `StartupExtensions/CommonExtensions.cs` | all four |
| `AddIdentityServices` / `AddApplicationServices` | `StartupExtensions/Identity/IdentityExtensions.cs` | Identity |
| `AddBasketServices` | `StartupExtensions/Basket/BasketExtensions.cs` | Basket |
| `AddAdminServices` | `StartupExtensions/Admin/AdminExtensions.cs` | Admin |
| `AddAngular` / `UseAngular` | `StartupExtensions/ApiWeb/ApiWebExtensions.cs` | Web |

The trade-off is the one you always get with a shared infrastructure library:
adding a service is cheap and consistent, but the services are now coupled through
a common assembly and cannot be versioned or deployed truly independently. For a
system of this size that was the right trade. At ten services it would not be.

---

## 2. Authentication

**Issuance.** `WebApi.Infrastructure/Services/TokenService.cs` signs the token:

- algorithm: `SecurityAlgorithms.HmacSha512Signature` (**HS512**)
- key: `new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"]))`
- issuer: `config["Token:Issuer"]`
- lifetime: 7 days

The claim list is assembled by the caller, `API.Identity/Controllers/UserController.cs`
— email, name identifier, user id and the user's roles from `UserManager` — and
passed in, so `TokenService` stays a signing concern only. It is called on register,
login and the current-user endpoint. `GenerateRefreshToken()` exists (32 random
bytes, base64) but nothing consumes it — there is no refresh flow.

One small real bug: `Expires = DateTime.Now.AddDays(7)` uses local time. JWT `exp`
is defined in UTC, so on any server not running at UTC+0 the token's stated expiry
is off by the machine's offset. It should be `DateTime.UtcNow`.

**Validation.** `CommonExtensions.AddCommonIdentity` registers `AddJwtBearer` with
the same symmetric key and issuer, `ValidateAudience = false`, plus role and claim
policies. `API.Basket` and `API.Admin` call it. Each validates the token itself.

**The property this buys.** No service makes an HTTP call to Identity to
authenticate a request. The token is self-contained, so Identity can be down and an
already-signed-in user can still use their basket. The cost is the usual one: a
token cannot be revoked before it expires, and with a 7-day lifetime and no refresh
flow that is a long window.

**Where it is wrong.** See defect 2 in the README — the committed key was 128 bits
against an algorithm requiring 512. Separately, `API.Web` calls
`app.UseAuthentication()` and `app.UseAuthorization()` without ever registering an
authentication scheme, and has a `Token` configuration section that nothing reads.
That is dead pipeline, not a vulnerability, but it is the kind of thing that makes
a reader distrust the rest.

---

## 3. Data

Three stores, chosen per workload rather than by default.

| Store | What lives there | Accessed through |
|---|---|---|
| SQL Server `identitydb` | ASP.NET Core Identity tables | `AppIdentityDbContext` (`IdentityDbContext<AppUser, AppRole, string>`) |
| SQL Server `appdb` | Products, brands, types, orders, order items, delivery methods, comments | `StoreContext` + `IGenericRepository<T>` / `IUnitOfWork` |
| Redis | Customer baskets | `IBasketRepository` → `BasketContext` |

**Separate databases, not separate schemas.** Two connection strings
(`IdentityConnection`, `DefaultConnection`) against two databases, so an identity
migration physically cannot touch store tables. It also means there is no foreign
key from an order to a user — the association is by the id carried in the JWT,
which is the correct shape for services that are supposed to be independent, and a
consistency problem you then have to live with.

**Why Redis for the basket, specifically.** Two properties an in-process
`IMemoryCache` cannot give you: the basket survives a restart of `API.Basket`, and
two instances of `API.Basket` behind a load balancer see the same basket. Values are
`System.Text.Json` blobs written with a fixed 30-day expiry (`StringSetAsync(..., TimeSpan.FromDays(30))`)
— note that it is absolute, not sliding, so an actively used basket still dies 30
days after it was first written. The class is unfortunately
named `BasketContext` and sits in `WebApi.Db.Store` — it is not an EF Core context
and the name is a mistake.

**Querying.** The generic repository is paired with a specification pattern
(`WebApi.Domain/Specifications/`) so that `Include`s, filters, sorting and paging
compose without the repository growing a method per query.

**Schema creation.** Both `Program.cs` files call `EnsureCreatedAsync()` *and*
`MigrateAsync()` at startup and then seed from JSON in
`WebApi.Db.Store/SeedData/`. No `Migrations` folder is committed — `build/migrations.*.bat`
regenerates them from scratch. This is the weakest part of the data story: the two
calls are mutually exclusive strategies, and a system with no committed migrations
has no upgrade path for an existing database.

---

## 4. Payments

`WebApi.Infrastructure/Services/PaymentService.cs` and
`API.Basket/Controllers/PaymentsController.cs`.

1. The client posts to `POST api/payments/{basketId}`.
2. `PaymentService` re-reads the basket from Redis and **re-prices every line
   against the database**, correcting any price the client sent. This is the part
   that matters: the amount charged is never taken from client input.
3. Delivery cost is looked up from `DeliveryMethod` and added.
4. A Stripe `PaymentIntent` is created or updated; `PaymentIntentId` and
   `ClientSecret` are written back onto the basket in Redis.
5. Stripe calls back to `POST api/payments/webhook`, verified with
   `EventUtility.ConstructEvent`, handling `payment_intent.succeeded` and
   `payment_intent.payment_failed` and updating the order status.

The secret key comes from `StripeSettings:SecretKey` in configuration. It used to
have a hardcoded test-mode key as a fallback; that has been removed and the code now
fails fast with an explanatory message instead.

---

## 5. Messaging — the unfinished part

This section exists because the README's headline architecture would be wrong
without it.

**What is there:**

- `EventBus.Messages/Services/RabbitMqManager.cs` — a publisher using raw
  `RabbitMQ.Client` `BasicPublish` against exchange `owlet.order.exchange`
- `EventBus.Messages/BackgroundTasks/MessageWorker.cs` — a `BackgroundService`
  consumer using `EventingBasicConsumer`
- `EventBus.Messages/BackgroundTasks/OrderReceivedConsumer.cs` — a second consumer
- `EventBus.Messages/Common/MessageConstants.cs` — queue and exchange names
- `MassTransit 8.0.10` and `RabbitMQ.Client 6.4.0` package references
- a `rabbitowlet` service in `docker-compose.yml`, management UI on port 8088
- a `RabbitMqHost` setting in Basket's and Admin's `appsettings.json`

**Why none of it runs:**

| Thing | State |
|---|---|
| `EventBus.Messages` project reference | **No project references it.** It compiles as an island |
| MassTransit registration in `BasketExtensions` | commented out |
| MassTransit registration + `AddConsumer<OrderReceivedConsumer>` in `AdminExtensions` | commented out |
| `AddHostedService<MessageWorker>()` | commented out |
| `_orderProcessingNotification.OrderReceived(...)` in `OrderService` | commented out |
| `services.AddSingleton<IOrderProcessingNotification, MessageNotification>()` | commented out — and `MessageNotification` does not exist |
| `OrderReceivedConsumer` | extends `DefaultBasicConsumer` (RabbitMQ.Client) but exposes `Consume(ConsumeContext<T>)` (MassTransit) without implementing `IConsumer<T>`; neither library would dispatch to it |
| `OrderMessageDTO`, the one contract | lives in `WebApi.Domain/Integration/`, not in the shared contracts project |

So order creation is synchronous: `OrderService` writes the order through
`IUnitOfWork` inside the checkout request.

**What finishing it would take**, in order:

1. Move `OrderMessageDTO` into `EventBus.Messages` and reference that project from
   both `API.Basket` and `API.Admin`, so the contract has exactly one definition and
   a change breaks the build on both sides rather than at runtime on one.
2. Pick one library. MassTransit is already referenced and gives retry, redelivery
   and a consumer abstraction; the raw `RabbitMQ.Client` code should go.
3. Register `IPublishEndpoint` in Basket, `AddConsumer<T>` + a receive endpoint in
   Admin, and uncomment the publish in `OrderService`.
4. Add an outbox. Writing the order and publishing the event are currently two
   operations with no transaction across them; without an outbox a crash between
   them loses the event silently.
5. Add a contract test that fails when the producer's and consumer's view of
   `OrderMessageDTO` diverge. This is the test whose absence let the whole path rot
   unnoticed.

---

## 6. Logging

Serilog is configured in `API.Identity`, `API.Basket` and `API.Web` — each
`Program.cs` calls `.UseSerilog(...)` with `.WriteTo.Console()` and
`.WriteTo.Seq("http://owletseq/")`. `API.Admin` has no Serilog at all.

Two known weaknesses:

- **The Seq URL is hardcoded in code**, and `ReadFrom.Configuration(...)` finds
  nothing because no `appsettings.json` contains a `Serilog` section. Changing the
  sink means recompiling.
- **No correlation ID.** Logs from three services land in one Seq instance, which is
  most of the value, but nothing ties the lines from one user action together. Adding
  a correlation ID to the request pipeline and propagating it through outbound calls
  and message headers is the single highest-value change to this area.

---

## 7. Edge and hosting

**nginx** (`src/nginx/nginx.local.conf`) listens on 5200, declares one upstream —
`api.identity:80` — and proxies `/` to it with permissive CORS headers. Upstreams
for `api.web` and `api.basket`, and a second server block for the storefront
hostname, are present but commented out. It is a reverse proxy in front of one
service, not a gateway. In practice the browser talks to all three services
directly on their published ports, which is why the CORS configuration is as broad
as it is.

**The SPA.** `API.Web` calls `AddSpaStaticFiles(RootPath = "wwwroot/dist")` and
`UseSpa(... UseAngularCliServer("start"))`. That means it launches and proxies the
Angular CLI dev server. `UseSpaStaticFiles()` is never called, `wwwroot/dist` does
not exist, the `.csproj` has no npm build target, and `API.Web/Dockerfile` never
runs `npm install` or `ng build`. Consequence: **the container does not serve the
SPA** — the Angular client is a development-time experience only.

**Compose.** `docker/docker-compose.yml` plus `docker-compose.override.yml` define
the four services (Admin commented out), SQL Server 2019, Redis 6, RabbitMQ 3,
Seq, smtp4dev, redis-commander, Portainer and nginx. Build contexts are relative to
the repository root, so the Compose files must sit next to `Owlet.sln` when you run
them — see [running.md](running.md).

---

## 8. If I rebuilt it today

- .NET 8 or 10, minimal APIs, and `Microsoft.Extensions.ServiceDiscovery` /
  .NET Aspire instead of hand-rolled Compose wiring.
- One real gateway (YARP) rather than nginx fronting a single service, so CORS,
  rate limiting and auth terminate in one place.
- Asymmetric signing (RS256) with a published JWKS, so validating services never
  hold the signing key. The current design distributes the secret that mints tokens
  to every service that merely needs to check them.
- Short-lived access tokens plus a real refresh flow, instead of a 7-day token.
- The transactional outbox from section 5, and a contract test per message type.
- Committed EF migrations, and one schema strategy rather than two.
- Health checks and readiness probes; right now `depends_on` orders container start
  but nothing waits for SQL Server to actually accept connections.
