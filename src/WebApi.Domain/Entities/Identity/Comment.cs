using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Domain.Entities.Store;

namespace WebApi.Domain.Entities.Identity
{
    public class Comment
    {
        public int Id { get; set; }
        public string Body{ get; set; }
        public AppUser? Author{ get; set; }
        public Product Product { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
