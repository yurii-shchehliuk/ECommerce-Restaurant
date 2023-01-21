using System;
using WebApi.Domain.Entities.Identity;

namespace WebApi.Infrastructure.SignalR
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public string UserName { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }
}
