# Architecture notes

Companion to the [README](../README.md). The longer version: what the projects
are, why the boundaries fall where they do, and what each design decision buys.

Everything here is checked against the source, and the runtime figures against a
running stack.

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

  API.Web/ClientApp/     the Angular 20 client, built into the API.Web image

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

HS512 requires a key at least as large as the algorithm's hash output — 512 bits,
64 bytes. `docs/running.md` covers generating one; the token library's own floor
is lower than the algorithm's requirement, so the size is a configuration
responsibility rather than something it will reject for you.

**Validation.** `CommonExtensions.AddCommonIdentity` registers `AddJwtBearer` with
the same symmetric key and issuer, `ValidateAudience = false`, plus the role and
claim policies. `API.Basket`, `API.Admin` and `API.Web` all call it.

Identity configures its own `JwtBearer` separately because it needs an
`OnMessageReceived` hook to pull `access_token` off the query string for SignalR.

**The property this buys.** No service makes an HTTP call to Identity to
authenticate a request, so Identity can be down and an already-signed-in user can
still use their basket. The cost is that a token cannot be revoked before it
expires, and with a 7-day lifetime and no refresh flow that is a long window.

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

`OrderByPaymentIntentIdSpecification` matches on `PaymentIntentId` equality, which
is only meaningful when an intent exists: without Stripe configured every basket
carries a null intent, and a null-matches-null lookup would find an unrelated
order. `OrderService` skips the lookup entirely when there is no payment intent,
with tests on both branches.

**Schema creation.** Migrations are committed —
`WebApi.Db.Identity/Migrations/` (9 tables) and `WebApi.Db.Store/Migrations/`
(8 tables). Start-up calls `MigrateAsync()` and nothing else. `EnsureCreated` is
deliberately not in the picture: it builds the schema from the model without
writing `__EFMigrationsHistory`, and the two strategies cannot be mixed.

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

**Why this project references nothing.** `EventBus.Messages` has no
`ProjectReference` at all, and a test asserts it:
`TheContractsAssembly_DependsOnNoDomainProject`. A contract that sits in the
domain assembly and embeds an entity makes every persistence change an invisible
change to the public wire format, with one added navigation property enough to
start serialising an object graph onto a queue. `OrderPlaced` is flat and carries
primitives only. The mapping from domain to contract lives in
`WebApi.Infrastructure/Services/OrderEventPublisher.cs`, the one place that
legitimately knows about both.

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

**Next: the outbox.** Committing the order and publishing the event are two
operations with no transaction across them, so a crash in the gap loses the
event. MassTransit's EF Core outbox — writing the message into `appdb` inside the
same `SaveChanges` as the order, with a delivery service draining it — closes
that window.

---

## 6. Logging

Serilog on all four services. Each `Program.cs` enriches with a `Service`
property, writes to the console, and writes to Seq at `Seq:ServerUrl` from
configuration, so changing the sink is a configuration edit rather than a
recompile. `ReadFrom.Configuration(ctx.Configuration)` reads a `Serilog` section
from every `appsettings.json`.

**Next: correlation IDs.** Four services' logs land in one Seq instance, which is
most of the value, but nothing ties the lines from one checkout together. A
correlation ID on the request pipeline, propagated through outbound calls and
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
`/orders`, `/shop`, `/account` and `/checkout`. Bare `/basket/` and `/admin/`
locations would collide with those client-side routes — nginx would answer a deep
link to `/basket` with a 301 to `/basket/` and hand it to `API.Basket`, which
404s. Under the `/svc` prefix both deep links return 200.

Because the production bundle uses those relative prefixes, the browser talks to
one origin and CORS does no work in production. The permissive CORS policy remains
for the `ng serve` development path, where the client is on :4200 and the services
are on their own ports.

**The SPA.** `src/API.Web/Dockerfile` has a `node:24-alpine` stage that runs
`npm ci` and `ng build --configuration production` and copies the output into
`wwwroot/dist`. `UseAngular` serves that with `UseSpaStaticFiles()` outside
Development and proxies to the Angular CLI dev server inside it. The production
configuration swaps `src/environment.ts` for `src/environment.prod.ts`, whose
URLs are all gateway-relative, so the deployed bundle is single-origin.

`AddSpaStaticFiles(RootPath = "wwwroot/dist")` expects a flat directory, which is
why `angular.json` pins `outputPath.browser` to `""`: the v20 application builder
would otherwise emit `dist/browser/`.

**Compose.** `docker-compose.yml` sits next to `Owlet.sln`, because the build
context is the repository root and Docker resolves it relative to the compose
file. It defines all four services, the gateway, SQL Server 2019, Redis 6,
RabbitMQ 3, Seq, smtp4dev and redis-commander. SQL Server, Redis and RabbitMQ have
health checks and the services depend on `service_healthy`, so a service starts
against a dependency that is ready rather than merely started.
`DatabaseInitializer` retries on top of that, for the non-Docker path where there
is no health check at all.

Two health-check details worth knowing: current `mssql:2019-latest` images ship
`/opt/mssql-tools18`, not `/opt/mssql-tools`, and the v18 `sqlcmd` encrypts by
default and so rejects the container's self-signed certificate without `-C`.

---

## 8. The client

`src/API.Web/ClientApp`, Angular 20, standalone throughout - there are no
NgModules. Every component declares the directives and pipes its own template
uses, so what a template can reach is visible in the file beside it.

**Routing and loading.** `app.routes.ts` lazily loads everything except the
landing page, through `loadComponent` for a single view and `loadChildren` for an
area's own `*.routes.ts`. Routes carry `title`, which the router applies to
`document.title`, and may carry `data: { chrome: false }` to suppress the page
title bar - used by the centred single-purpose pages, which would otherwise carry
a second `h1`.

**State.** Services hold observables; components read them with `toSignal` or the
`async` pipe. Signal inputs are used where a component is a leaf that renders
what it is given. There is no state-management library: the only cross-component
state is the basket and the signed-in user, and each is one service with one
subject.

| Concern | Where |
|---|---|
| Basket, and the totals derived from it | `basket/basket.service.ts` |
| Signed-in user and the token | `account/account.service.ts` |
| Catalogue, and the page cache over it | `shop/shop.service.ts` |
| In-flight request count | `core/services/busy.service.ts` |
| Light / dark preference | `core/services/theme.service.ts` |
| Notifications | `core/services/toast.service.ts` |

**Design tokens.** `src/styles.css` declares the palette, the type scale, the
radii, the shadows and the spacing rhythm in a single Tailwind v4 `@theme` block.
The dark theme remaps those tokens and nothing else; no component is aware that
it exists. Three states - light, dark, and follow the system - because an
explicit choice has to be able to win against the system preference in both
directions, which a boolean cannot express.

**Dependencies.** Eight at runtime: the six `@angular/*` packages the application
actually imports, `@microsoft/signalr` for the chat hub, and `rxjs`. Tailwind is
a build dependency. `@angular/cdk` is the only component library, and only for
`CdkStepper`, which supplies the checkout wizard's state machine and no styling.

**Contracts the client has to honour.** Two are worth naming because getting
either wrong produces a 400 that reads like something else:

- `BasketItem` requires `pictureUrl`, `brand` and `type` on every line, so
  `BasketService.toBasketItem` sends all three.
- `RegisterVM` requires `ConfirmPassword` and constrains `Password` with a regular
  expression. `shared/validators/password.ts` mirrors that rule so the answer
  arrives under the field rather than as a server error.

**Tests.** Karma and Jasmine, 77 specs, `npm run test:ci` to run them headless.
They cover the pager's windowing, the basket service's guards and its
re-pricing-from-the-response rule, the catalogue cache, the breadcrumb
derivation, the theme preference, toast de-duplication, the password rules and
the order-event latency scaling.

---

## 9. If I rebuilt it today

- .NET 8 or 10, minimal APIs, and .NET Aspire instead of hand-rolled Compose
  wiring.
- The transactional outbox from section 5, first.
- YARP instead of nginx, so CORS, rate limiting and auth terminate in one place
  that is testable in-process.
- Asymmetric signing (RS256) with a published JWKS, so validating services never
  hold the key that mints tokens.
- Short-lived access tokens plus a real refresh flow, instead of a 7-day token.
- Correlation IDs through the pipeline and the message headers.
- Contract tests per message type, of the kind `OrderPlacedContractTest` provides
  for the only message that exists.
