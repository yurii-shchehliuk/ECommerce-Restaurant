using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Domain.CQRS.QueryHandling;
using WebApi.Domain.Entities.Store;
using WebApi.Domain.Interfaces.Repositories;

namespace API.Admin.Functions.ProductFunc.Queries
{
    public class GetAllProductsQuery : IQuery<List<Product>>
    {
        public class GetAllProductsQueryHandler : IQueryHandler<GetAllProductsQuery, List<Product>>
        {
            private readonly IGenericRepository<Product> _productsRepo;
            public GetAllProductsQueryHandler(IGenericRepository<Product> productsRepo)
            {
                _productsRepo = productsRepo;
            }
            public async Task<List<Product>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
            {
                return (List<Product>)await _productsRepo.ListAllAsync();
            }
        }
    }
}
