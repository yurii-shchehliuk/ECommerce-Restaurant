using System.Collections.Generic;

namespace WebApi.Domain.Entities.Store
{
    /// <summary>
    /// redis cart
    /// </summary>
    public class CustomerBasket
    {
        public CustomerBasket()
        {
        }

        public CustomerBasket(string id)
        {
            Id = id;
        }
        /// <summary>
        /// client side genereted 
        /// </summary>
        public string Id { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
        public int? DeliveryMethodId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        public decimal ShippingPrice { get; set; }
    }
}