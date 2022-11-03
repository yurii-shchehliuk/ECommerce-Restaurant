using Microsoft.Extensions.Hosting;
using StackExchange.Redis;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace WebApi.Infrastructure.BackgroundTasks
{
    /// <summary>
    /// RDM Redis Console
    /// </summary>
    /// <example>
    /// PUBLISH messagesChannel "Something"
    /// </example>
    internal class RedisSubscriber : BackgroundService
    {
        private readonly IConnectionMultiplexer connection;
        public RedisSubscriber(IConnectionMultiplexer connection)
        {
            this.connection = connection;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var subscriber = connection.GetSubscriber();
            return subscriber.SubscribeAsync("messagesChannel", (channel, value) =>
            {
                Console.WriteLine($"The message content: {value}");
            });
        }
    }
}
