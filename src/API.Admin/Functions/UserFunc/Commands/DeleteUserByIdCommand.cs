using API.Admin.Functions.ProductFunc.Commands;
using MediatR;
using System.Threading.Tasks;
using System.Threading;
using WebApi.Domain.CQRS.CommandHandling;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Domain.Entities.Identity;

namespace API.Admin.Functions.UserFunc.Commands
{
    public class DeleteUserByIdCommand : ICommand
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
                //var product = await _unitOfWork.Repository<AppUser>().GetByIdAsync(request.Id);
                //_unitOfWork.Repository<AppUser>().Delete(product);

                await _unitOfWork.Complete();
                return Unit.Value;
            }
        }
    }
}
