using WebApi.Infrastructure.Services;
using WebApi.Test.Fixtures;
using Xunit;

namespace WebApi.Test
{
    public class RedisTest : IClassFixture<RedisCacheWithDIFixture>
    {
        private readonly RedisCacheWithDIFixture _redisFixture;

        public RedisTest(RedisCacheWithDIFixture connectionMultiplexer)
        {
            _redisFixture = connectionMultiplexer;
        }
        [Fact]
        public async Task ResponseCacheService()
        {
            //arrange
            ResponseCacheService basketContext = new ResponseCacheService(_redisFixture.GetIConnectionMultiplexer, _redisFixture.GetILogger);
            //act
            var result = await basketContext.GetCachedResponseAsync("test");
            //assert
            Assert.IsNotType(null, result);
        }

        //public void RedisSubscriber()
        //{
        //    RedisSubscriber redisSubscriber = new RedisSubscriber(_connection);
        //}

        //public async Task BasketContext()
        //{
        //    BasketContext basketContext = new BasketContext(_connection);
        //}
    }
}
