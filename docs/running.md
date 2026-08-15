# Running Owlet

Two ways: everything in Docker, or the infrastructure in Docker and the services
from your IDE. The second is what the project was developed with day to day.

> **Honest status:** the Compose stack was last run in 2023 against .NET 6 base
> images and has not been re-verified since. `dotnet build Owlet.sln` passes for
> every C# project today. If something below does not work, the compose wiring is
> the first place to look, not your machine.

---

## Prerequisites

| | Version |
|---|---|
| .NET SDK | 6.0 (newer SDKs build `net6.0` fine, with an out-of-support warning) |
| Node.js | 16.x — Angular 15 does not support Node 18+ cleanly |
| Angular CLI | 15.1.6 |
| Docker Desktop | any recent version, Linux containers |
| SQL Server | only for the no-Docker path; LocalDB or Express is enough |

---

## 1. Configuration

**Nothing real is committed.** The repository contains templates; you create the
actual files, and `.gitignore` keeps them out.

```bash
cp src/WebApi.Domain/Common.env.template src/WebApi.Domain/Common.env
cp .env.template .env
```

### The signing key

`TokenService` signs with **HS512**, so `Token:Key` must be at least 64 bytes /
512 bits. Anything shorter is accepted by the token library but is weaker than the
algorithm requires (see the README's "What I'd do differently", item 2).

```bash
openssl rand -base64 64
```

```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(64))
```

Put the result in `src/WebApi.Domain/Common.env` as `Token__Key`.

**The same key must be used by every service** — `API.Identity` signs with it and
`API.Basket` and `API.Admin` validate with it. If they disagree, every authenticated
request returns 401.

### The SQL Server password

Set `SA_PASSWORD` in `.env` to something that satisfies SQL Server's policy (8+
characters, three of: uppercase, lowercase, digit, symbol). The same value goes into
the `Password=` segment of both connection strings in `Common.env`.

`.env` also carries `OWLET_DBUSER_PASSWORD`, used only if you build the custom SQL
Server image in `sql/` instead of the stock `mcr.microsoft.com/mssql/server` one —
`sql/InitializeOwletDb.sql` creates an application login with it. The default
Compose setup uses the stock image, so you can leave it at the placeholder.

### Stripe

The payment endpoints need a Stripe **test-mode** secret key of your own. There is
no default and the code fails fast without one:

```bash
cd src/API.Identity && dotnet user-secrets init
dotnet user-secrets set "StripeSettings:SecretKey" "sk_test_..."
```

Do the same in `src/API.Basket`. Everything except checkout works without it.

### Preferred local approach: user-secrets

Rather than editing `appsettings.json` — which is how the credentials in this
repo's history got committed in the first place — use user-secrets. They live
outside the repository entirely, in your user profile:

```bash
cd src/API.Identity
dotnet user-secrets init
dotnet user-secrets set "Token:Key" "<your 64-byte key>"
dotnet user-secrets set "ConnectionStrings:IdentityConnection" "<...>"
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "<...>"
```

Repeat for `API.Basket`, `API.Web` and `API.Admin`. User-secrets only apply in the
Development environment, which is exactly what you want.

---

## 2. Everything in Docker

The Compose files declare their build contexts relative to the repository root
(`context: .` with `dockerfile: src/API.Identity/Dockerfile`, and Dockerfiles that
`COPY ["src/API.Identity/...", ...]`). They therefore have to sit next to
`Owlet.sln` when they run:

```bash
cp docker/docker-compose*.yml docker/.dockerignore .
docker compose up --build
```

First run pulls SQL Server 2019, Redis, RabbitMQ, Seq, smtp4dev, redis-commander,
Portainer and nginx, then builds three .NET images. Expect it to take a while.

### Ports

| Service | URL | Notes |
|---|---|---|
| nginx | http://localhost:5200 | proxies to `api.identity` only |
| `API.Identity` | http://localhost:5041 | `/swagger` in Development |
| `API.Basket` | http://localhost:5031 | `/swagger` in Development |
| `API.Web` | http://localhost:5021 | |
| SQL Server | `localhost,1433` | user `sa`, your `SA_PASSWORD` |
| Redis | `localhost:6379` | |
| redis-commander | http://localhost:8081 | browse basket keys |
| RabbitMQ management | http://localhost:8088 | `guest` / `guest` |
| Seq | http://localhost:5342 | all structured logs land here |
| smtp4dev | http://localhost:5010 | catches outbound mail |
| Portainer | http://localhost:9000 | |

### Known gaps in the Compose path

These are real, and documented rather than hidden:

- **`API.Admin` is commented out** of `docker-compose.yml`. Its Dockerfile exists
  but nothing builds it.
- **The SPA is not served from the container.** `API.Web`'s Dockerfile never runs
  `npm install` or `ng build`, and `UseSpaStaticFiles()` is never called. Run the
  Angular client separately (section 3).
- **Nothing waits for SQL Server.** `depends_on` orders container *start*, not
  readiness, so the API containers can come up before SQL Server accepts
  connections and fail their first migration attempt. `docker compose restart
  api.identity` after SQL Server settles is the workaround; proper health checks
  are the fix.
- **`ConnectionStrings:Redis` is `localhost`** in `appsettings.json`, which does not
  resolve to the Redis container from inside another container. Override it with
  `ConnectionStrings__Redis=redis` in the service's `environment:` block, or in
  `Common.env`.

---

## 3. Infrastructure in Docker, services from the IDE

This is how the project was actually developed and the path most likely to work.

**Start only the backing services:**

```bash
cp docker/docker-compose*.yml docker/.dockerignore .
docker compose up owletsql redis redis-commander owletseq owletsmtp rabbitowlet
```

**Create the databases.** No EF migrations are committed; the batch scripts in
`build/` generate them:

```bat
build\migrations.identity.bat
build\migrations.store.bat
```

Or let the app do it — both `Program.cs` files create and seed the databases at
startup.

**Run the APIs.** Set `API.Identity`, `API.Basket` and `API.Web` as multiple startup
projects in Visual Studio, or from the CLI:

```bash
dotnet run --project src/API.Identity
dotnet run --project src/API.Basket
dotnet run --project src/API.Web
```

**Run the Angular client:**

```bash
cd src/API.Web/ClientApp
npm install
ng serve
```

`API.Web` proxies to the CLI dev server via `UseAngularCliServer`, so the SPA is
available through `API.Web` once `ng serve` is up.

---

## 4. Building and testing

```bash
dotnet build Owlet.sln
dotnet test tests/WebApi.Test
```

Two caveats:

- `API.Web.csproj` runs `tsc` as part of its build and will fail with
  `TS2688: Cannot find type definition file for 'jasmine'` until you have run
  `npm install` in `src/API.Web/ClientApp`. Every other project builds without it.
- The test project contains **four** tests. Three cover JWT issuance and
  cross-service validation and need nothing external. The fourth
  (`RedisTest.ResponseCacheService`) needs a Redis instance listening on
  `localhost:6379` — start the Redis container first or it will fail.
- If you only have a newer .NET SDK installed and not the .NET 6 *runtime*, the test
  host will refuse to launch. `DOTNET_ROLL_FORWARD=LatestMajor dotnet test` works
  around it.

---

## 5. Troubleshooting

**`ng.ps1 cannot be loaded` on Windows**

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Node version errors from Angular 15** — use nvm-windows and install Node 16.13.0.

**401 on every authenticated request** — `Token:Key` and `Token:Issuer` differ
between the issuing service and the validating one. They must match exactly.

**`SA_PASSWORD` variable is not set** — you skipped `cp .env.template .env`. The
Compose files use `${SA_PASSWORD:?...}` deliberately, so that a missing password
fails loudly instead of falling back to a committed default.

**SQL Server container exits immediately** — the password does not meet SQL
Server's complexity policy. `docker compose logs owletsql` will say so.
