using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;
using WebApi.Infrastructure.Services;

namespace WebApi.Test.Fixtures
{
    public class RedisCacheWithDIFixture : IDisposable
    {
        private readonly ServiceProvider _serviceProvider;

        public RedisCacheWithDIFixture()
        {
            var services = new ServiceCollection();

            services.AddSingleton<IConnectionMultiplexer>(c =>
            {
                var configuration = ConfigurationOptions.Parse("localhost", true);
                configuration.AbortOnConnectFail = false;
                return ConnectionMultiplexer.Connect(configuration);
            });
            services.AddLogging();

            _serviceProvider = services.BuildServiceProvider();
        }

        public IConnectionMultiplexer GetIConnectionMultiplexer
        {
            get
            {
                return _serviceProvider.GetService<IConnectionMultiplexer>();
            }
        }

        public ILogger<ResponseCacheService> GetILogger
        {
            get
            {
                return _serviceProvider.GetService<ILogger<ResponseCacheService>>();
            }
        }

        public void Dispose()
        {
        }
    }
}
