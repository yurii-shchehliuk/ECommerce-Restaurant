using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Domain.Entities;
using WebApi.Domain.Interfaces;

namespace AdminAPI.Functions.ProductFunc.Queries
{
    public class GetAllProductsQuery : IRequest<IEnumerable<Product>>
    {
        public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, IEnumerable<Product>>
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
