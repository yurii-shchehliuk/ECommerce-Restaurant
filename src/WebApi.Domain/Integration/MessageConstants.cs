using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Domain.Integration
{
   public class MessageConstants
    {
        public const string queueName = "owlet.order.received";
        public const string exchangeName = "owlet.order.exchange";
    }
}
