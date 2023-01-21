using AutoMapper;
using WebApi.Domain.DTOs;
using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Entities.OrderAggregate;
using WebApi.Domain.Entities.Store;
using WebApi.Infrastructure.SignalR;

namespace API.Web.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Comment, CommentDTO>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Author.UserName));
        }
    }
}