﻿using MassTransit;
using RabbitMQ.Client;
using Serilog;
using WebApi.Domain.Integration;

namespace EventBus.Messages.BackgroundTasks
{
    /// <summary>
    /// 
    /// </summary>
    /// <todo>move to the particular api library and inject services</todo>
    /// <see>DefaultBasicConsumer vs IConsumer</see>
    public class OrderReceivedConsumer : DefaultBasicConsumer
    {
        public OrderReceivedConsumer()
        {

        }
        public async Task Consume(ConsumeContext<OrderMessageDTO> context)
        {
            Log.ForContext("Order received", context.Message, true)
                .Information("Received a message from queue for processing");

            await Task.CompletedTask;
        }
    }
}
