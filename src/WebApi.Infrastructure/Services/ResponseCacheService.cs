using Microsoft.Extensions.Logging;
using StackExchange.Redis;
using System;
using System.Text.Json;
using System.Threading.Tasks;
using WebApi.Domain.Interfaces.Services;

namespace WebApi.Infrastructure.Services
{
    /// <summary>Redis cache</summary>
    public class ResponseCacheService : IResponseCacheService
    {
        private readonly IDatabase _database;
        private readonly ILogger<ResponseCacheService> logger;

        public ResponseCacheService(IConnectionMultiplexer redis, ILogger<ResponseCacheService> logger)
        {
            _database = redis.GetDatabase();
            this.logger = logger;
        }

        public async Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive)
        {
            if (response == null)
            {
                return;
            }

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var serialisedResponse = JsonSerializer.Serialize(response, options);

            try
            {
                await _database.StringSetAsync(cacheKey, serialisedResponse, timeToLive);
            }
            catch (Exception ex)
            {
                logger.LogCritical("REDIS. Falied to cache response. Ex: {message}", ex.Message);
            }
        }

        public async Task<string> GetCachedResponseAsync(string cacheKey)
        {
            try
            {
                var cachedResponse = await _database.StringGetAsync(cacheKey);

                if (cachedResponse.IsNullOrEmpty)
                {
                    return null;
                }

                return cachedResponse;
            }
            catch (Exception ex)
            {
                logger.LogCritical("REDIS. Falied to get cache. Ex: {message}", ex.Message);
                return null;
            }
        }
    }
}