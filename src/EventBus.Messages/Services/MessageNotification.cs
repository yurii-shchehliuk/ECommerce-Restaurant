using EventBus.Messages.Common;
using MassTransit;
using Microsoft.Extensions.Configuration;
using RabbitMQ.Client;
using Serilog;
using System;
using System.Text.Json;
using WebApi.Domain.Entities.OrderAggregate;
using WebApi.Domain.Integration;
using WebApi.Domain.Interfaces.Integration;

namespace EventBus.Messages.Services
{
    /// <summary>
    /// Message sender
    /// </summary>
    /// <see cref="Message reciever"/>
    public class MessageNotification : IOrderProcessingNotification, IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        //private readonly IPublishEndpoint _publish;

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
            var message = new OrderMessageDTO { Order = order, CustomerEmail = buyerEmail, PaymentIntentId = paymentIntentId };
            var messageBytes = JsonSerializer.SerializeToUtf8Bytes(message);
            _channel.BasicPublish("", MessageConstants.queueName, null, messageBytes);
            //_publish.Publish(message);
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

