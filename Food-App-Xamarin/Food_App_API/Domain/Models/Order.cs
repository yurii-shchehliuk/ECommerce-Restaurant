using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Models
{
    /// <summary>
    /// IBasket
    /// </summary>
    public class Order : BaseModel
    {
        public string FullName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public double OrderTotal { get; set; }
        public bool IsOrderCompleted { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public ICollection<OrderDetail> OrderDetails { get; set; }

    }
}
