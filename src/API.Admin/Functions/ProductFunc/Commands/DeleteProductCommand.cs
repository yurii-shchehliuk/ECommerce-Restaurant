using MediatR;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Domain.CQRS.CommandHandling;
using WebApi.Domain.Entities.Store;
using WebApi.Domain.Interfaces.Repositories;

namespace API.Admin.Functions.ProductFunc.Commands
{
    public class DeleteProductCommand : ICommand
    {
        public int Id { get; set; }
        public class DeleteProductHandler : ICommandHandler<DeleteProductCommand>
        {
            private readonly IUnitOfWork _unitOfWork;
            public DeleteProductHandler(IUnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }
            public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
            {
                var product = await _unitOfWork.Repository<Product>().FindByIdAsync(request.Id);

                if (product == null) return Unit.Value;

                // Was un-awaited (CS4014): the delete raced the commit.
                await _unitOfWork.Repository<Product>().DeleteAsync(product);
                await _unitOfWork.Complete();
                return Unit.Value;
            }
        }
    }
}
