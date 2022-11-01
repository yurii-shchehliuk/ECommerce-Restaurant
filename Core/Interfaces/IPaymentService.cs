using System.Threading.Tasks;
using WebApi.Domain.Entities;
using WebApi.Domain.Entities.OrderAggregate;

namespace WebApi.Domain.Interfaces
{
    public interface IPaymentService
    {
        Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId);
        Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId);
        Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
    }
}