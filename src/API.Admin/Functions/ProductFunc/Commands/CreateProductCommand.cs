using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
                try
                {

                    var product = _mapper.Map<Product>(request.Product);
                    _unitOfWork.Repository<Product>().Add(product);
                }
                catch (System.Exception ex)
                {

                }

                var result = await _unitOfWork.Complete();
                return Unit.Value;
            }
        }
    }
}
