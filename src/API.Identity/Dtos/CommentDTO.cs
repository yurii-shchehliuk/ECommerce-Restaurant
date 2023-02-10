using System;
using WebApi.Domain.Entities.Identity;

namespace API.Identity.Dtos
{
    public class CommentDTO
    {
        public string Id { get; set; }
        public string MessageBody { get; set; }
        public string? UserName { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
        public string GroupName { get; set; }
    }
}
