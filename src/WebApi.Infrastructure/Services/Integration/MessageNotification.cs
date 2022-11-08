using Microsoft.Extensions.Configuration;
using RabbitMQ.Client;
using Serilog;
using System;
using System.Text.Json;
using WebApi.Domain.Entities.OrderAggregate;
using WebApi.Domain.Integration;
using WebApi.Domain.Integration.MessageDTOs;
using WebApi.Domain.Interfaces.Integration;

namespace WebApi.Infrastructure.Services.Integration
{
    /// <summary>
    /// Message sender
    /// </summary>
    /// <see cref="Message reciever"/>
    public class MessageNotification : IOrderProcessingNotification, IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;

        public MessageNotification(IConfiguration config)
        {
            var factory = new ConnectionFactory
            {
                HostName = config.GetValue<string>("RabbitMqHost")
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.QueueDeclare(MessageConstants.queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);
        }
        public void OrderReceived(Order order, string buyerEmail, string paymentIntentId)
        {
            var message = new OrderMessage { Order = order, CustomerEmail = buyerEmail, PaymentIntentId = paymentIntentId };
            var messageBytes = JsonSerializer.SerializeToUtf8Bytes(message);
            _channel.BasicPublish("", MessageConstants.queueName, null, messageBytes);
            Log.ForContext("Body", message, true)
                .Information("Published order notification");
        }

        public void Dispose()
        {
            _channel.Dispose();
            _connection?.Dispose();
        }
    }
}

