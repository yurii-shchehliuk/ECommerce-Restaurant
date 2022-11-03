using System.Threading;
using System.Threading.Tasks;
using WebApi.Domain.CQRS.QueryHandling;
using WebApi.Domain.Entities.Store;
using WebApi.Domain.Interfaces;

namespace API.Admin.Functions.ProductFunc.Queries
{
    public class GetProductByIdQuery : IQuery<Product>
    {
        public int Id { get; set; }
        public class GetProductByIdQueryHandler : IQueryHandler<GetProductByIdQuery, Product>
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
