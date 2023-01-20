using Serilog;
using StackExchange.Redis;
using System;
using System.Text.Json;
using System.Threading.Tasks;
using WebApi.Domain.Entities.Store;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Db.Store
{
    /// <summary>
    /// Redis database
    /// </summary>
    /// <seealso cref="memurai"/>
    /// <remarks>Redis + docker needed</remarks>
    public class BasketContext : IBasketRepository
    {
        private readonly IDatabase _database;

        public BasketContext(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            return await _database.KeyDeleteAsync(basketId);
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            try
            {
                var data = await _database.StringGetAsync(basketId);
                return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
            }
            catch (Exception ex)
            {
                Log.ForContext("REDIS exception:", ex).Error("REDIS exception");
                return null;
            }
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var created = await _database.StringSetAsync(basket.Id,
                JsonSerializer.Serialize(basket), TimeSpan.FromDays(30));

            if (!created) return null;

            return await GetBasketAsync(basket.Id);
        }
    }
}