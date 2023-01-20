using MassTransit;
using Serilog;
using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using WebApi.Domain.Integration;

namespace EventBus.Messages.BackgroundTasks
{
    /// <summary>
    /// 
    /// </summary>
    /// <todo>move to the particular api library and inject services</todo>
    public class OrderReceivedConsumer : IConsumer<OrderMessageDTO>
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
