# Running Owlet

Two ways: everything in Docker, or the infrastructure in Docker and the services
from your IDE.

## Prerequisites

| | Version |
|---|---|
| Docker Desktop | any recent version, Linux containers |
| .NET SDK | 6.0 for the no-Docker path (newer SDKs build `net6.0` fine, with an out-of-support warning) |
| Node.js | only for the no-Docker path — 18.x works; the container builds the client itself |
| SQL Server | only for the no-Docker path; LocalDB or Express is enough |

`dotnet build Owlet.sln` and `dotnet test` need neither Node.js nor Docker.

---

## 1. Configuration

**Nothing real is committed.** The repository contains templates; you create the
actual files, and `.gitignore` keeps them out.

```bash
cp .env.template .env
cp src/WebApi.Domain/Common.env.template src/WebApi.Domain/Common.env
```

### `.env` — infrastructure

`SA_PASSWORD` must satisfy SQL Server's policy: 8+ characters, three of
uppercase, lowercase, digit, symbol. Compose builds every service's connection
string from this one value, so there is nowhere else to keep it in sync.

Compose fails loudly (`${SA_PASSWORD:?set SA_PASSWORD in .env}`) rather than
falling back to a committed default.

### `Common.env` — the signing key

`TokenService` signs with **HS512**, so `Token:Key` must be at least 64 bytes /
512 bits — RFC 7518 §3.2 requires a key at least as large as the algorithm's hash
output. The token library's own floor is lower, so generate the full 64 bytes:

```bash
openssl rand -base64 64
```

```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(64))
```

Put the result in `src/WebApi.Domain/Common.env` as `Token__Key`. **Every service
must use the same key** — Identity signs with it, the others validate with it. If
they disagree, every authenticated request returns 401.

### Stripe (optional)

The payment endpoints need a Stripe **test-mode** secret key of your own. There is
no default and the code fails fast without one. Everything except the checkout
wizard's final step works without it, including placing orders through
`POST /svc/basket/api/orders`.

```bash
cd src/API.Basket
dotnet user-secrets set "StripeSettings:SecretKey" "sk_test_..."
```

Or set `StripeSettings__SecretKey` in `Common.env`.

### Preferred local approach: user-secrets

Use user-secrets rather than editing `appsettings.json`. They live outside the
repository entirely, so there is nothing to accidentally commit:

```bash
cd src/API.Identity
dotnet user-secrets init
dotnet user-secrets set "Token:Key" "<your 64-byte key>"
```

User-secrets only apply in the Development environment, which is exactly what you
want.

---

## 2. Everything in Docker

```bash
docker compose up --build
```

That is the whole command. The compose file lives next to `Owlet.sln`, because the
build context is the repository root and Docker resolves it relative to the
compose file.

First run pulls SQL Server 2019, Redis, RabbitMQ, Seq, smtp4dev and
redis-commander, then builds five images — including a Node stage that runs
`npm ci` and `ng build` for the Angular client. Expect ten minutes cold.

The services wait for SQL Server, Redis and RabbitMQ to report healthy before they
start, and retry their migrations on top of that, so a cold start meets a database
that is already accepting connections.

### Ports

| Service | URL | Notes |
|---|---|---|
| Gateway / storefront | http://localhost:5200 | the only URL you need |
| Order events (live) | http://localhost:5200/admin/order-events | what Admin consumed off the bus |
| `API.Identity` | http://localhost:5041 | `/swagger` |
| `API.Basket` | http://localhost:5031 | `/swagger` |
| `API.Admin` | http://localhost:5011 | `/swagger` |
| `API.Web` | http://localhost:5021 | no Swagger; runs as Production |
| SQL Server | `localhost,1433` | user `sa`, your `SA_PASSWORD` |
| Redis | `localhost:6379` | |
| redis-commander | http://localhost:8081 | browse basket keys |
| RabbitMQ management | http://localhost:8088 | `guest` / `guest` |
| Seq | http://localhost:5342 | logs from all four services |
| smtp4dev | http://localhost:5010 | catches outbound mail |

### Proving the asynchronous path yourself

```bash
# 1. Register (or use the storefront's sign-up form).
curl -X POST http://localhost:5200/svc/identity/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"displayName":"Demo","email":"demo@owlet.dev","password":"Owlet1!x","confirmPassword":"Owlet1!x"}'

# 2. Keep the token from that response.
TOKEN=...

# 3. Put something in a basket. pictureUrl, brand and type are required by
#    BasketItem's validation; omitting them returns a 400 that lists them.
curl -X POST http://localhost:5200/svc/basket/api/basket \
  -H "Content-Type: application/json" \
  -d '{"id":"b1","deliveryMethodId":2,"items":[{"id":12,"productName":"10 Piece Wicked","price":16.00,"quantity":2,"pictureUrl":"x.jpg","brand":"KFC","type":"Snacks"}]}'

# 4. Place the order.
curl -X POST http://localhost:5200/svc/basket/api/orders \
  -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" \
  -d '{"basketId":"b1","deliveryMethodId":2,"shipToAddress":{"firstName":"Demo","lastName":"Buyer","street":"1 Main St","city":"St. Paul","state":"MN","zipcode":"55101"}}'

# 5. Read what API.Admin consumed off RabbitMQ.
curl http://localhost:5200/svc/admin/api/orderevents
```

Step 5 returning a row is the proof: nothing writes that table except
`OrderPlacedConsumer`, and nothing invokes the consumer except a delivered
message.

To see the queue itself hold a message, stop the consumer first:

```bash
docker compose stop api.admin
# place another order — it still returns 200
docker exec owlet-rabbitmq rabbitmqctl list_queues name messages consumers
#   owlet-order-placed   1   0
docker compose up -d api.admin
# the row appears, with a bus latency equal to the length of the outage
```

---

## 3. Infrastructure in Docker, services from the IDE

**Start only the backing services:**

```bash
docker compose up owletsql redis redis-commander owletseq owletsmtp rabbitowlet
```

**Point the services at localhost.** `appsettings.Development.json` already uses
`Server=localhost\SQLEXPRESS` and `amqp://guest:guest@localhost:5672`; adjust if
you are using the containerised SQL Server instead (`Server=localhost,1433`).

**Run the APIs.** They apply their own migrations at start-up:

```bash
dotnet run --project src/API.Identity
dotnet run --project src/API.Basket
dotnet run --project src/API.Admin
```

**Run the Angular client:**

```bash
cd src/API.Web/ClientApp
npm install
npm start          # ng serve on :4200
dotnet run --project ../../API.Web
```

In Development, `API.Web` proxies to the CLI dev server, so the SPA is available
through `API.Web` once `ng serve` is up. In Development the client uses
`src/environment.ts`, which points at the services' own ports rather than at the
gateway.

---

## 4. Migrations

Migrations are committed, and the services apply them at start-up. You only need
these to *add* one:

```bash
dotnet tool restore

dotnet dotnet-ef migrations add <Name> \
  --project src/WebApi.Db.Store --startup-project src/WebApi.Db.Store \
  --context StoreContext --output-dir Migrations
```

The data projects carry `IDesignTimeDbContextFactory`, so no web host is involved
and the connection string in the factory is a placeholder — EF only needs the
provider to decide what SQL to emit.

To read the SQL without touching a database:

```bash
dotnet dotnet-ef migrations script \
  --project src/WebApi.Db.Store --startup-project src/WebApi.Db.Store \
  --context StoreContext --idempotent
```

`build/migrations.identity.bat` and `build/migrations.store.bat` regenerate the
initial migrations from scratch.

---

## 5. Building and testing

```bash
dotnet build Owlet.sln
dotnet test tests/WebApi.Test
```

Both work from a clean clone with no Node.js and no Docker. 25 tests, none of
which need infrastructure — including the MassTransit in-memory harness test that
asserts a published `OrderPlaced` reaches its consumer.

If you have a newer SDK but not the .NET 6 *runtime*, the test host rolls forward
automatically (`RollForward=Major` in the test project).

---

## 6. Troubleshooting

**`SA_PASSWORD` variable is not set** — you skipped `cp .env.template .env`.

**SQL Server container exits immediately** — the password does not meet SQL
Server's complexity policy. `docker compose logs owletsql` will say so.

**`owlet-sqlserver is unhealthy` and everything else refuses to start** — the
health check runs `/opt/mssql-tools18/bin/sqlcmd -C`. If you have edited it,
note that older images used `/opt/mssql-tools` and that v18's `sqlcmd` encrypts
by default and needs `-C` to accept the container's self-signed certificate.

**401 on every authenticated request** — `Token:Key` and `Token:Issuer` differ
between the issuing service and the validating one. They must match exactly.

**The order events page says "disconnected"** — `API.Admin` is not running.
`docker compose up -d api.admin`. Orders placed meanwhile are not lost; they wait
on the queue.

**`ng.ps1 cannot be loaded` on Windows**

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
