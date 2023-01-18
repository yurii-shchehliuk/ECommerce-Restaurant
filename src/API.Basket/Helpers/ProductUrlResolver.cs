using API.Basket.Dtos;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using WebApi.Domain.Entities.Store;

namespace API.Basket.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDto, string>
    {
        private readonly IConfiguration _config;
        public ProductUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.PictureUrl))
            {
                return _config["ContentSrcUrl"] + source.PictureUrl;
            }

            return null;
        }
    }
}