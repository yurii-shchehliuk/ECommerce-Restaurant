using API.Basket.Dtos;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using WebApi.Domain.Entities.OrderAggregate;

namespace API.Basket.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration _config;
        public OrderItemUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ItemOrdered.PictureUrl))
            {
                return _config["ContentSrcUrl"] + source.ItemOrdered.PictureUrl;
            }

            return null;
        }
    }
}