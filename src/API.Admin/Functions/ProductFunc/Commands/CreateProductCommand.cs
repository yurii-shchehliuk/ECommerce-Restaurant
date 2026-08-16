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
                // Both calls are awaited and neither is wrapped in a catch: the add has
                // to reach the change tracker before Complete() runs, and a failure in
                // either has to reach the caller rather than return 200 for a product
                // that was never saved.
                var product = _mapper.Map<Product>(request.Product);

                await _unitOfWork.Repository<Product>().AddAsync(product);
                await _unitOfWork.Complete();

                return Unit.Value;
            }
        }
    }
}
