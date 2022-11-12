using AutoMapper;
using WebApi.Domain.DTOs;
using WebApi.Domain.Entities.Store;

namespace API.Admin.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, Product>();
            CreateMap<ProductCreateDto, Product>();
        }
    }
}