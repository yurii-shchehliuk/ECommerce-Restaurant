using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Domain.CQRS.QueryHandling;
using WebApi.Domain.Entities.Store;
using WebApi.Domain.Interfaces;

namespace API.Admin.Functions.ProductFunc.Queries
{
    public class GetAllProductsQuery : IQuery<IEnumerable<Product>>
    {
        public class GetAllProductsQueryHandler : IQueryHandler<GetAllProductsQuery, IEnumerable<Product>>
        {
            private readonly IGenericRepository<Product> _productsRepo;
            public GetAllProductsQueryHandler(IGenericRepository<Product> productsRepo)
            {
                _productsRepo = productsRepo;
            }
            public async Task<IEnumerable<Product>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
            {
                var productList = await _productsRepo.ListAllAsync();
                return productList;
            }
        }
    }
}
