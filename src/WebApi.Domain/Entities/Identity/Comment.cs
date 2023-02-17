using System;
using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Domain.Entities.Store;

namespace WebApi.Domain.Entities.Identity
{
    public class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; }
        [NotMapped]
        public AppUser Author { get; set; }
        public Product Product { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
