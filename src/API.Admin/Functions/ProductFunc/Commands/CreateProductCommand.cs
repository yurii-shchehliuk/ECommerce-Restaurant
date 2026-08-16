using AutoMapper;
using MediatR;
using Serilog;
using System;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Domain.CQRS.CommandHandling;
using WebApi.Domain.DTOs;
using WebApi.Domain.Entities.Store;
using WebApi.Domain.Interfaces.Repositories;

namespace API.Admin.Functions.ProductFunc.Commands
{
    public class CreateProductCommand : ICommand
    {
        public ProductCreateDto Product { get; set; }
        public class CreateProductHandler : ICommandHandler<CreateProductCommand>
        {
            private readonly IUnitOfWork _unitOfWork;
            private readonly IMapper _mapper;

            public CreateProductHandler(IUnitOfWork unitOfWork, IMapper mapper)
            {
                _unitOfWork = unitOfWork;
                this._mapper = mapper;
            }
            public async Task<Unit> Handle(CreateProductCommand request, CancellationToken cancellationToken)
            {
                // The AddAsync call used to be un-awaited (CS4014), so Complete() could
                // race the add and commit nothing. The try/catch around it also swallowed
                // the failure and then reported success, which is how a create could
                // return 200 having saved no product.
                var product = _mapper.Map<Product>(request.Product);

                await _unitOfWork.Repository<Product>().AddAsync(product);
                await _unitOfWork.Complete();

                return Unit.Value;
            }
        }
    }
}
