using AutoMapper;
using MediatR;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Domain.CQRS.CommandHandling;
using WebApi.Domain.Entities.Store;
using WebApi.Domain.Interfaces.Repositories;

namespace API.Admin.Functions.ProductFunc.Commands
{
    public class UpdateProductCommand :ICommand
    {
        public Product Product{ get; set; }
        public class UpdateProductHandler : ICommandHandler<UpdateProductCommand>
        {
            private readonly IUnitOfWork _unitOfWork;
            private readonly IMapper _mapper;

            public UpdateProductHandler(IUnitOfWork unitOfWork, IMapper mapper)
            {
                this._unitOfWork = unitOfWork;
                this._mapper = mapper;
            }

            public async Task<Unit> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
            {
                var product = await _unitOfWork.Repository<Product>().GetByIdAsync(request.Product.Id);
                _mapper.Map(request.Product, product);
                await _unitOfWork.Complete();

                return Unit.Value;
            }
        }
    }
}
