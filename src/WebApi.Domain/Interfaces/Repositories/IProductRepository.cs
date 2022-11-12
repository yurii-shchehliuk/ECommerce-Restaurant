using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Entities.Store;

namespace WebApi.Domain.Interfaces.Repositories
{
    public interface IProductRepository
    {
        Task<Product> GetProductByIdAsync(int id);
        Task<IReadOnlyList<Product>> GetProductsAsync();
        Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync();
        Task<IReadOnlyList<ProductType>> GetProductTypesAsync();
    }
}