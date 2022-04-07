using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class Product : BaseModel
    {
        public string Name { get; set; }
        public string Detail { get; set; }
        public string ImageUrl { get; set; }        
        public double Price { get; set; }
        public double Rating { get; set; }
        public bool IsPopularProduct { get; set; }  
        public int? CategoryId { get; set; }
        public Category Category { get; set; }

        [NotMapped]
        //[JsonIgnore]
        public byte[] ImageArray { get; set; }
        
        [Newtonsoft.Json.JsonIgnore]
        public ICollection<OrderDetail> OrderDetails { get; set; }
        
        [Newtonsoft.Json.JsonIgnore]
        public ICollection<ShoppingCartItem> ShoppingCartItems { get; set; }
    }
}
