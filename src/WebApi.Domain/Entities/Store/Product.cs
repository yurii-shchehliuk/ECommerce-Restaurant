using System.Collections;
using System.Collections.Generic;
using WebApi.Domain.Entities.Identity;

namespace WebApi.Domain.Entities.Store
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public ProductType ProductType { get; set; }
        public int ProductTypeId { get; set; }
        public ProductBrand ProductBrand { get; set; }
        public int ProductBrandId { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}