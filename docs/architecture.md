# Architecture notes

Companion to the [README](../README.md). The longer version: what the projects
are, why the boundaries fall where they do, and where the design is deliberate
versus where it is still unfinished.

Everything here was checked against the source, and the runtime claims were
checked against a running stack. Where something is not wired up, it says so.

---

## 1. Solution layout

`Owlet.sln`, 10 projects, all targeting `net6.0`.

```
src/
  API.Identity/          host — registration, sign-in, token issuance; owns identitydb
  API.Basket/            host — basket, payments, orders; owns appdb; publishes OrderPlaced
  API.Admin/             host — product administration; consumes OrderPlaced
  API.Web/               host — serves the built Angular bundle

  WebApi.Domain/         entities, DTOs, interfaces, specifications, CQRS markers
  WebApi.Infrastructure/ services + startup extensions shared by all four hosts
  WebApi.Db.Identity/    AppIdentityDbContext, its migration, identity seeding
  WebApi.Db.Store/       StoreContext + migration, BasketContext (Redis), seed data
  EventBus.Messages/     wire contracts, the consumer, and both bus registrations

  nginx/                 the gateway
tests/
  WebApi.Test/           xUnit — 25 tests
docker-compose.yml       next to Owlet.sln, because that is the build context
sql/                     an optional custom SQL Server image
build/                   migration helper scripts
```

### Why the hosts are thin

The four API projects contain almost no cross-cutting code. Authentication,
Swagger, AutoMapper, the generic repository, the unit of work and both halves of
the bus are registered through `IServiceCollection` extensions in
`WebApi.Infrastructure`:

| Extension | File | Used by |
|---|---|---|
| `AddCommonIdentity` | `StartupExtensions/CommonExtensions.cs` | Basket, Admin, Web |
| `AddSwaggerDocumentation` / `UseSwaggerDocumention` | `StartupExtensions/CommonExtensions.cs` | all four |
| `AddIdentityServices` / `AddApplicationServices` | `StartupExtensions/Identity/IdentityExtensions.cs` | Identity |
| `AddApplicationServices` | `StartupExtensions/Basket/BasketExtensions.cs` | Basket |
| `AddApplicationServices` | `StartupExtensions/Admin/AdminExtensions.cs` | Admin |
| `AddApplicationServices` / `UseAngular` | `StartupExtensions/ApiWeb/ApiWebExtensions.cs` | Web |
| `MigrateWithRetryAsync` / `WaitForAsync` | `StartupExtensions/DatabaseInitializer.cs` | Identity, Basket, Admin |

The trade-off is the one you always get with a shared infrastructure library:
adding a service is cheap and consistent, but the services are coupled through a
common assembly and cannot be versioned or deployed truly independently. For a
system of this size that was the right trade. At ten services it would not be.

A dead Autofac container module used to live here too — `MediatorConfiguration`,
`AutofacDependencyResolver` and a hand-rolled `Mediator` in `WebApi.Domain.Core`,
none of which anything ever installed, alongside the MediatR that actually
dispatches. It has been deleted.

---

## 2. Authentication

**Issuance.** `WebApi.Infrastructure/Services/TokenService.cs`:

- algorithm: `SecurityAlgorithms.HmacSha512Signature` (**HS512**)
- key: `new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"]))`
- issuer: `config["Token:Issuer"]`
- lifetime: 7 days

The claim list is assembled by the caller,
`API.Identity/Controllers/UserController.cs` — email, name identifier, user id and
roles from `UserManager` — and passed in, so `TokenService` stays a signing
concern only.

Two real defects, both still open and both covered in the README's "What is still
wrong": the shipped key was 128 bits against an algorithm requiring 512, and
`Expires = DateTime.Now.AddDays(7)` uses local time where JWT `exp` is defined in
UTC.

**Validation.** `CommonExtensions.AddCommonIdentity` registers `AddJwtBearer` with
the same symmetric key and issuer, `ValidateAudience = false`, plus the role and
claim policies. `API.Basket`, `API.Admin` **and now `API.Web`** call it. `API.Web`
previously called `UseAuthentication()`/`UseAuthorization()` with no scheme
registered at all and carried a `Token` configuration section nothing read — dead
pipeline that reads like working security.

Identity configures its own `JwtBearer` separately because it needs an
`OnMessageReceived` hook to pull `access_token` off the query string for SignalR.

**The property this buys.** No service makes an HTTP call to Identity to
authenticate a request, so Identity can be down and an already-signed-in user can
still use their basket. The cost is that a token cannot be revoked before it
expires, and with a 7-day lifetime and no refresh flow that is a long window.

**Registration used to be impossible.** The register action carried
`[ValidateAntiForgeryToken]`, whose filter is only registered by
`AddControllersWithViews()`. `API.Identity` calls `AddControllers()`, so every
registration request failed with `No service for type
ValidateAntiforgeryTokenAuthorizationFilter has been registered` — a 500. The
attribute was also the wrong tool: anti-forgery defends cookie-authenticated form
posts, and this is an anonymous JSON endpoint on a bearer-token API.

---

## 3. Data

Three stores, chosen per workload rather than by default.

| Store | What lives there | Accessed through |
|---|---|---|
| SQL Server `identitydb` | ASP.NET Core Identity tables | `AppIdentityDbContext` |
| SQL Server `appdb` | Products, brands, types, orders, order items, delivery methods, comments, received order events | `StoreContext` + `IGenericRepository<T>` / `IUnitOfWork` |
| Redis | Customer baskets | `IBasketRepository` → `BasketContext` |

**Separate databases, not separate schemas.** Two connection strings against two
databases, so an identity migration physically cannot touch store tables. It also
means there is no foreign key from an order to a user — the association is by the
id carried in the JWT, which is the correct shape for services meant to be
independent, and a consistency problem you then live with.

**Ownership.** `API.Basket` applies `appdb`'s migrations, `API.Identity` applies
`identitydb`'s, and `API.Admin` — which reads and writes `appdb` but does not own
it — only waits for the database to become reachable. Two services racing to apply
the same migrations is how a schema ends up half-created.

**Why Redis for the basket.** Two properties an in-process `IMemoryCache` cannot
give you: the basket survives a restart of `API.Basket` (verified with
`docker compose restart api.basket`), and two instances behind a load balancer see
the same basket. Values are `System.Text.Json` blobs with a fixed 30-day expiry —
absolute, not sliding, so an actively used basket still dies 30 days after it was
first written. The class is unfortunately named `BasketContext` and sits in
`WebApi.Db.Store`; it is not an EF Core context and the name is a mistake.

**Querying.** The generic repository is paired with a specification pattern
(`WebApi.Domain/Specifications/`) so `Include`s, filters, sorting and paging
compose without the repository growing a method per query.

One specification had a real bug. `OrderByPaymentIntentIdSpecification` compares
`PaymentIntentId` for equality, so given a null intent it matches every order that
also has a null intent. Without Stripe configured every basket has a null intent,
so the second checkout after a fresh start found the *first* order ever placed,
tried to delete it and called `CreateOrUpdatePaymentIntent(null)`. `OrderService`
now skips the lookup entirely when there is no payment intent, with tests on both
branches.

**Schema creation.** Migrations are committed —
`WebApi.Db.Identity/Migrations/` (9 tables) and `WebApi.Db.Store/Migrations/`
(8 tables). Start-up calls `MigrateAsync()` and nothing else; the previous code
called `EnsureCreatedAsync()` *and* `MigrateAsync()`, which are mutually exclusive
strategies, because `EnsureCreated` builds the schema from the model without
writing `__EFMigrationsHistory` and then `Migrate` tries to create tables that
already exist.

Migrations are generated from the data projects through
`IDesignTimeDbContextFactory`, not through a web host, so regenerating one does
not require the ASP.NET host and its configuration to resolve first. The factory's
connection string is a placeholder: EF only needs the provider to decide what SQL
to emit and never opens it for `migrations add` or `migrations script`. `dotnet-ef`
is pinned in `.config/dotnet-tools.json`.

---

## 4. Payments

`WebApi.Infrastructure/Services/PaymentService.cs` and
`API.Basket/Controllers/PaymentsController.cs`.

1. The client posts to `POST api/payments/{basketId}`.
2. `PaymentService` re-reads the basket from Redis and **re-prices every line
   against the database**, correcting any price the client sent. The amount
   charged is never taken from client input. `OrderService` does the same thing on
   the checkout path, and there is a test for it.
3. Delivery cost is looked up from `DeliveryMethod` and added.
4. A Stripe `PaymentIntent` is created or updated; `PaymentIntentId` and
   `ClientSecret` are written back onto the basket in Redis.
5. Stripe calls back to `POST api/payments/webhook`, verified with
   `EventUtility.ConstructEvent`, handling `payment_intent.succeeded` and
   `payment_intent.payment_failed` and updating the order status.

The secret key comes from `StripeSettings:SecretKey`. There is no fallback; the
code fails fast with an explanatory message. The consequence is that the Angular
checkout wizard's final step cannot complete without a key of your own, which is
why the demo places its order through the same API the wizard calls.

---

## 5. Messaging

This section used to be titled "the unfinished part". It is finished.

**What runs.** `API.Basket` publishes `OrderPlaced` through MassTransit;
`API.Admin` consumes it from the durable queue `owlet-order-placed`.

```
src/EventBus.Messages/
  Contracts/OrderPlaced.cs        the wire format — flat, primitives only
  Contracts/OrderPlacedItem.cs
  Abstractions/IOrderEventSink.cs where a consumed event is recorded
  Consumers/OrderPlacedConsumer.cs  IConsumer<OrderPlaced>
  Common/MessageConstants.cs      queue name, configuration key
  EventBusExtensions.cs           AddOrderEventPublishing / AddOrderEventConsuming
```

**Why this project references nothing.** The old contract, `OrderMessageDTO`, sat
in `WebApi.Domain` and embedded the whole `Order` **entity**, so any change to a
persistence model was invisibly a change to the public wire format, and adding a
navigation property could have started serialising an object graph onto a queue.
`EventBus.Messages` now has no `ProjectReference` at all, and a test asserts it:
`TheContractsAssembly_DependsOnNoDomainProject`. The mapping from domain to
contract lives in `WebApi.Infrastructure/Services/OrderEventPublisher.cs`, the one
place that legitimately knows about both.

**Ordering.** `OrderService` publishes only after `IUnitOfWork.Complete()`
succeeds. Publishing first would let Admin record an order that a failed
transaction then rolled back, and no consumer-side retry can undo that.
`CreateOrder_PublishesExactlyOnce_AfterTheCommit` asserts the ordering, not just
the call.

**Idempotency.** RabbitMQ delivers at least once, so `OrderEventSink` checks
`EventId` before inserting and the migration puts a unique index on that column.
A redelivery is consumed twice and recorded once, which is asserted directly.

**Observability.** `ReceivedOrderEvent` rows are the durable evidence that a
message arrived. `GET /api/orderevents` on Admin returns them, and the Angular
client renders them at `/admin/order-events` with a bus-latency column computed
from the gap between publication and consumption. A row there cannot exist unless
the bus delivered something.

**Measured.** 5–9 ms end to end with both services up. With `api.admin` stopped,
checkout still succeeds, the queue holds the message (`messages 1, consumers 0`),
and the event is consumed 14.3 seconds later when Admin returns — the length of
the outage.

**What was there before.** A raw `RabbitMQ.Client` publisher, an
`EventingBasicConsumer` background service, and `OrderReceivedConsumer`, which
extended `DefaultBasicConsumer` (RabbitMQ.Client) while exposing
`Consume(ConsumeContext<T>)` (MassTransit) without implementing `IConsumer<T>` —
half-migrated between two libraries and dispatchable by neither. None of it was
referenced by any project, the registrations were commented out, and
`MassTransit.RabbitMQ` was not even a package reference, so the commented-out code
could not have compiled. All of it is deleted.

**What is still missing: the outbox.** Committing the order and publishing the
event are two operations with no transaction across them. A crash between them
loses the event silently. MassTransit's EF Core outbox — writing the message into
`appdb` inside the same `SaveChanges` as the order, with a delivery service
draining it — is the fix, and it has not been done.

---

## 6. Logging

Serilog on all four services. `API.Admin` had none at all before; it does now.
Each `Program.cs` enriches with a `Service` property, writes to the console, and
writes to Seq at `Seq:ServerUrl` from configuration — the URL used to be a string
literal in code, so changing the sink meant recompiling.

`ReadFrom.Configuration(ctx.Configuration)` now finds a `Serilog` section in every
`appsettings.json`; previously no such section existed anywhere, so the call read
nothing.

**Still missing: correlation IDs.** Four services' logs land in one Seq instance,
which is most of the value, but nothing ties the lines from one checkout together.
A correlation ID on the request pipeline, propagated through outbound calls and
message headers, is the highest-value remaining change here.

---

## 7. Edge and hosting

**The gateway.** `src/nginx/nginx.local.conf` listens on 5200 and routes:

| Path | Upstream |
|---|---|
| `/` | `api.web` — the built Angular bundle |
| `/svc/identity/` | `api.identity` |
| `/svc/basket/` | `api.basket` |
| `/svc/admin/` | `api.admin` |

The trailing slash on both the `location` and the `proxy_pass` strips the prefix,
so `/svc/basket/api/products` reaches Basket as `/api/products`. The WebSocket
upgrade is passed through for SignalR.

The `/svc` segment is not decoration. The Angular router owns `/basket`, `/admin`,
`/orders`, `/shop`, `/account` and `/checkout`, so bare `/basket/` and `/admin/`
locations collided with real client-side routes: nginx answered a deep link to
`/basket` with a 301 to `/basket/` and handed it to `API.Basket`, which 404s.
Measured before the change: `/basket` and `/admin` returned 301. After: 200.

Because the production bundle uses those relative prefixes, the browser talks to
one origin and CORS does no work in production. The permissive CORS policy remains
for the `ng serve` development path, where the client is on :4200 and the services
are on their own ports.

Before this, nginx declared upstreams for the SPA and the basket and commented
both out; only `api.identity` was routed. It was a reverse proxy in front of one
service.

**The SPA.** `src/API.Web/Dockerfile` has a `node:18-alpine` stage that runs
`npm ci` and `ng build --configuration production` and copies the output into
`wwwroot/dist`. `UseAngular` serves that with `UseSpaStaticFiles()` outside
Development and proxies to the Angular CLI dev server inside it.

Previously the image contained neither Node.js nor a bundle while the host was
configured to launch `ng serve` at runtime, `UseSpaStaticFiles()` was never
called, and `wwwroot/dist` did not exist — so the container could not serve the
client at all. `angular.json` also pointed its `fileReplacements` at
`src/environments/environment.ts`, a path that does not exist, so the production
build failed outright; and the file it swapped in had a flatter shape than the
code reads.

**Compose.** `docker-compose.yml` sits next to `Owlet.sln`, because the build
context is the repository root and Docker resolves it relative to the compose
file. It defines all four services, the gateway, SQL Server 2019, Redis 6,
RabbitMQ 3, Seq, smtp4dev and redis-commander. SQL Server, Redis and RabbitMQ have
health checks and the services depend on `service_healthy`, so container *start*
order is no longer confused with readiness. `DatabaseInitializer` retries on top of
that, for the non-Docker path where there is no health check at all.

Two health-check details worth knowing, because both fail silently in the
copy-pasted version: current `mssql:2019-latest` images ship
`/opt/mssql-tools18`, not `/opt/mssql-tools`, and the v18 `sqlcmd` encrypts by
default and so rejects the container's self-signed certificate without `-C`.

---

## 8. If I rebuilt it today

- .NET 8 or 10, minimal APIs, and .NET Aspire instead of hand-rolled Compose
  wiring.
- The transactional outbox from section 5, first.
- YARP instead of nginx, so CORS, rate limiting and auth terminate in one place
  that is testable in-process.
- Asymmetric signing (RS256) with a published JWKS, so validating services never
  hold the key that mints tokens.
- Short-lived access tokens plus a real refresh flow, instead of a 7-day token.
- Correlation IDs through the pipeline and the message headers.
- Contract tests per message type, of the kind `OrderPlacedContractTest` now
  provides for the only message that exists.
