using API.Identity.Dtos;
using AutoMapper;
using WebApi.Domain.DTOs;
using WebApi.Domain.Entities.Identity;

namespace API.Identity.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<AddressDto, WebApi.Domain.Entities.OrderAggregate.Address>();
            CreateMap<AppUser, UserDto>()
               .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
               .ForMember(d => d.Email, o => o.MapFrom(s => s.Email))
               .ForMember(d => d.IsAdmin, o => o.MapFrom(s => s.IsAdmin))
               .ForMember(d => d.Id, o => o.MapFrom(s => s.Id));
        }
    }
}