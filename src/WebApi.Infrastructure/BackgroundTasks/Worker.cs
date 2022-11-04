using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Serilog;
using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;
using WebApi.Domain.Integration;

namespace API.Admin.Processor
{
    public class Worker : BackgroundService
    {
        private const string queueName = "qickorder.received";

        private readonly IConnection connection;
        private readonly IModel channel;
        private readonly EventingBasicConsumer consumer;


        public Worker(IConfiguration configuration)
        {
            var factory = new ConnectionFactory
            {
                HostName = configuration.GetValue<string>("RabbitMqHost")
            };

            connection = factory.CreateConnection();
            channel = connection.CreateModel();
            channel.QueueDeclare(queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);

            consumer = new EventingBasicConsumer(channel);
            consumer.Received += ProcessQuickOrderReceived;

        }

        private void ProcessQuickOrderReceived(object sender, BasicDeliverEventArgs eventArgs)
        {
            var orderInfo = JsonSerializer.Deserialize<QickReceivedMessage>(eventArgs.Body.ToArray());

            Log.ForContext("Order received", orderInfo, true)
                .Information("Received a message from qieie for processing");
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                channel.BasicConsume(queueName, true, consumer);
            }
        }
    }
}
