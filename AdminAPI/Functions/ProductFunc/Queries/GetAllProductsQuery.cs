using Core.Entities;
using Core.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

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
