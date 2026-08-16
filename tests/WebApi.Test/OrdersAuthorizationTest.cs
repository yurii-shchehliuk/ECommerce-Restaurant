using System.Net;
using System.Net.Http.Headers;
using System.Security.Claims;
using API.Basket.Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebApi.Domain.Constants;
using WebApi.Domain.Entities.OrderAggregate;
using WebApi.Domain.Interfaces.Services;
using WebApi.Infrastructure.Services;
using WebApi.Infrastructure.StartupExtensions;
using Xunit;

namespace WebApi.Test
{
    /// <summary>
    /// <c>api/orders/allOrders</c> returns every buyer's email, name and delivery
    /// address. These tests drive the real <see cref="OrdersController"/> through a
    /// real MVC pipeline configured by the same <c>AddCommonIdentity</c> the three API
    /// hosts call, so what they assert is what the deployed services do.
    ///
    /// The host is built from a bare <see cref="WebHostBuilder"/> rather than from
    /// API.Basket's <c>Startup</c>: the authorization behaviour under test needs the
    /// authentication scheme, the authorization policies and the controller, and none
    /// of Redis, SQL Server, RabbitMQ or Stripe. Tests that need infrastructure get
    /// skipped.
    /// </summary>
    public class OrdersAuthorizationTest : IDisposable
    {
        // At least 512 bits, because TokenService signs with HS512 (RFC 7518 s3.2).
        private const string TestKey =
            "test-only-key-not-a-secret-0123456789-0123456789-0123456789-0123456789";
        private const string TestIssuer = "https://localhost:5041";

        private readonly TestServer _server;
        private readonly HttpClient _client;
        private readonly TokenService _tokens;

        public OrdersAuthorizationTest()
        {
            var config = new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string>
                {
                    ["Token:Key"] = TestKey,
                    ["Token:Issuer"] = TestIssuer
                })
                .Build();

            _tokens = new TokenService(config);

            _server = new TestServer(new WebHostBuilder()
                .UseEnvironment(Environments.Production)
                .ConfigureServices(services =>
                {
                    services.AddSingleton<IConfiguration>(config);
                    services.AddCommonIdentity(config);
                    services.AddControllers()
                        .AddApplicationPart(typeof(OrdersController).Assembly);
                    services.AddSingleton<IOrderService, StubOrderService>();
                })
                .Configure(app =>
                {
                    app.UseRouting();
                    app.UseAuthentication();
                    app.UseAuthorization();
                    app.UseEndpoints(endpoints => endpoints.MapControllers());
                }));

            _client = _server.CreateClient();
        }

        [Fact]
        public async Task AllOrders_IsNotReachableAnonymously()
        {
            var response = await _client.GetAsync("/api/orders/allOrders");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task AllOrders_IsNotReachableByASignedInNonAdmin()
        {
            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", TokenFor(UserRole.User));

            var response = await _client.GetAsync("/api/orders/allOrders");

            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task AnOrderListing_IsNotReachableAnonymously()
        {
            // The [Authorize] sits on the controller, not on one action: every action
            // here works from the email in the token's claims.
            var response = await _client.GetAsync("/api/orders");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        private string TokenFor(string role) => _tokens.CreateToken(new List<Claim>
        {
            new Claim(ClaimTypes.Email, "someone@example.com"),
            new Claim(ClaimTypes.Role, role)
        });

        public void Dispose()
        {
            _client.Dispose();
            _server.Dispose();
        }

        /// <summary>Stands in for the service the authorized action would call.</summary>
        private sealed class StubOrderService : IOrderService
        {
            public Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethod, string basketId, Address shippingAddress)
                => Task.FromResult<Order>(null!);

            public Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
                => Task.FromResult<IReadOnlyList<Order>>(new List<Order>());

            public Task<IReadOnlyList<Order>> GetOrders()
                => Task.FromResult<IReadOnlyList<Order>>(new List<Order>());

            public Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
                => Task.FromResult<Order>(null!);

            public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
                => Task.FromResult<IReadOnlyList<DeliveryMethod>>(new List<DeliveryMethod>());
        }
    }
}
