using IdentityAPI.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

namespace IdentityAPI.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            
            CreateMap<AppUser,UserDto>()
               .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
               .ForMember(d => d.Email, o => o.MapFrom(s => s.Email))
               .ForMember(d => d.IsAdmin, o => o.MapFrom(s => s.IsAdmin))
               .ForMember(d => d.Id, o => o.MapFrom(s=>s.Id));
        }
    }
}