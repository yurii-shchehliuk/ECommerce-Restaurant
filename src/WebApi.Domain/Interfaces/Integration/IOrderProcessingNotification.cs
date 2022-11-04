using System;
using System.Collections.Generic;
using System.Text;
using WebApi.Domain.Entities.OrderAggregate;

namespace WebApi.Domain.Interfaces.Integration
{
    public interface IOrderProcessingNotification
    {
        void QickOrderReceived(Order order, string buyerEmail, string paymentIntentId);
    }
}
