using System;
using System.Collections.Generic;
using System.Text;
using WebApi.Domain.Entities.OrderAggregate;

namespace WebApi.Domain.Integration
{
    public class QickReceivedMessage
    {
        public Order Order { get; set; }
        public string CustomerEmail { get; set; }
        public string PaymentIntentId { get; set; }
    }
}
