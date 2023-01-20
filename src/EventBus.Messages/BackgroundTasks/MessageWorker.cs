using EventBus.Messages.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Serilog;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Domain.Integration;

namespace EventBus.Messages.BackgroundTasks
{
    /// <summary>
    /// Message reciever
    /// </summary>
    /// <seealso cref="MassTransit"/>
    /// <seealso cref="RabbitMQ Sagas"/>
    /// <see cref="Message sender"/>
    public class MessageWorker : BackgroundService
    {
        private readonly IConnection connection;
        private readonly IModel channel;
        private readonly EventingBasicConsumer consumer;

        public MessageWorker(IConfiguration configuration)
        {
            var factory = new ConnectionFactory
            {
                HostName = configuration.GetValue<string>("RabbitMqHost")
            };

            connection = factory.CreateConnection();
            channel = connection.CreateModel();
            channel.QueueDeclare(MessageConstants.queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);

            consumer = new EventingBasicConsumer(channel);
            consumer.Received += ProcessQuickOrderReceived;
        }

        private void ProcessQuickOrderReceived(object sender, BasicDeliverEventArgs eventArgs)
        {
            var orderInfo = JsonSerializer.Deserialize<OrderMessageDTO>(eventArgs.Body.ToArray());

            Log.ForContext("Order received", orderInfo, true)
                .Information("Received a message from queue for processing");
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                channel.BasicConsume(MessageConstants.queueName, true, consumer);
            }

            await Task.CompletedTask;
        }
    }
}
