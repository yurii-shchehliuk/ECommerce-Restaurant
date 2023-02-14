using EventBus.Messages.BackgroundTasks;
using EventBus.Messages.Common;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RabbitMQ.Client;
using Serilog;
using System.Text;
using WebApi.Domain.Entities.OrderAggregate;
using WebApi.Domain.Integration;
using WebApi.Domain.Interfaces.Integration;

namespace EventBus.Messages.Services
{
    /// <summary>
    /// Message sender
    /// </summary>
    /// <see cref="Message reciever"/>
    /// <see>IPublishEndpoint vs _channel.BasicPublish</see>
    public class RabbitMqManager : IOrderProcessingNotification, IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;

        public RabbitMqManager(IConfiguration config)
        {
            var factory = new ConnectionFactory
            {
                HostName = config.GetValue<string>("RabbitMqHost"),
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.QueueDeclare(MessageConstants.queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);
        }
        public void OrderReceived(Order order, string buyerEmail, string paymentIntentId)
        {
            var message = new OrderMessageDTO { Order = order, CustomerEmail = buyerEmail, PaymentIntentId = paymentIntentId };
            SendCommand<OrderMessageDTO>(message);
            Log.ForContext("Body", message, true)
                .Information("Published order notification");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="message">i.e. command</param>
        private void SendCommand<T>(T message)
        {
            ///CreateChannel
            _channel.ExchangeDeclare(
                exchange: MessageConstants.exchangeName,
                type: ExchangeType.Direct);
            _channel.QueueDeclare(
                queue: MessageConstants.queueName, durable: false,
                exclusive: false, autoDelete: false, arguments: null);
            _channel.QueueBind(
                queue: MessageConstants.queueName,
                exchange: MessageConstants.exchangeName,
                routingKey: "");

            var serializedCommand = JsonConvert.SerializeObject(message);

            var messageProperties = _channel.CreateBasicProperties();
            messageProperties.ContentType = MessageConstants.JsonMimeType;

            _channel.BasicPublish(
                exchange: MessageConstants.exchangeName,
                routingKey: "",
                basicProperties: messageProperties,
                body: Encoding.UTF8.GetBytes(serializedCommand));

        }

        public void ListenForReisterCommand()
        {
            _channel.QueueDeclare(
                queue: MessageConstants.queueName,
                durable: false, exclusive: false,
                autoDelete: false, arguments: null);

            _channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);

            var consumer = new OrderReceivedConsumer();
            _channel.BasicConsume(
                queue: MessageConstants.queueName,
                autoAck: false,
                consumer: consumer);
        }

        public void Dispose()
        {
            if (!_channel.IsClosed)
                _channel.Dispose();

            _connection?.Dispose();
        }
    }
}

