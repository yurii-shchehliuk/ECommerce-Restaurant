using Microsoft.Extensions.Configuration;
using RabbitMQ.Client;
using Serilog;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using WebApi.Domain.Entities.OrderAggregate;
using WebApi.Domain.Integration;
using WebApi.Domain.Interfaces.Integration;

namespace WebApi.Infrastructure.Repositories.Integration
{
    public class OrderProcessingNotification : IOrderProcessingNotification, IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private const string queueName = "qickorder.received";

        public OrderProcessingNotification(IConfiguration config)
        {
            var factory = new ConnectionFactory
            {
                HostName = config.GetValue<string>("RabbitMqHost")
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.QueueDeclare(queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);
        }
        public void QickOrderReceived(Order order, string buyerEmail, string paymentIntentId)
        {
            var message = new QickReceivedMessage { Order = order, CustomerEmail = buyerEmail, PaymentIntentId = paymentIntentId };
            var messageBytes = JsonSerializer.SerializeToUtf8Bytes(message);
            _channel.BasicPublish("",queueName, null, messageBytes);
            Log.ForContext("Body", message, true)
                .Information("Published quickorder notification");
        }

        public void Dispose()
        {
            _channel.Dispose();
            _connection?.Dispose();

        }
    }
}

