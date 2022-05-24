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
    public class GetProductByIdQuery : IRequest<Product>
    {
        public int Id { get; set; }
        public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, Product>
        {
            private readonly IGenericRepository<Product> _productsRepo;
            public GetProductByIdQueryHandler(IGenericRepository<Product> productsRepo)
            {
                _productsRepo = productsRepo;
            }
            public async Task<Product> Handle(GetProductByIdQuery query, CancellationToken cancellationToken)
            {
                var product = await _productsRepo.GetByIdAsync(query.Id);
                return product;
            }
        }
    }
}
