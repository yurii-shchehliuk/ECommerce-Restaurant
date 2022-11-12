using System.Threading.Tasks;
using WebApi.Domain.Entities.OrderAggregate;
using WebApi.Domain.Entities.Store;

namespace WebApi.Domain.Interfaces.Services
{
    public interface IPaymentService
    {
        Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId);
        Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId);
        Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
    }
}