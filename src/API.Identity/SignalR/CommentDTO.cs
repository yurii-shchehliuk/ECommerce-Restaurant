using System;
using WebApi.Domain.Entities.Identity;

namespace API.Identity.SignalR
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string MessageBody { get; set; }
        public string UserName { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
    }
}
