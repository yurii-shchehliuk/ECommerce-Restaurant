using API.Identity.Dtos;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Db.Identity;
using WebApi.Db.Store;
using WebApi.Domain.Core;
using WebApi.Domain.CQRS.QueryHandling;
using WebApi.Domain.Entities.Identity;

namespace API.Identity.Functions.CommentFunc.Commands
{
    public class CommentCreate
    {
        public class Command : IQuery<Result<CommentDTO>>
        {
            public CommentDTO Comment { get; set; }
            public int ProductId { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Comment.MessageBody).NotEmpty();
            }
        }

        public class Handler : IQueryHandler<Command, Result<CommentDTO>>
        {
            private readonly StoreContext context;
            private readonly IMapper mapper;
            private readonly IHttpContextAccessor accessor;
            private readonly AppIdentityDbContext identityDbContext;

            public Handler(StoreContext context, IMapper mapper, IHttpContextAccessor accessor, AppIdentityDbContext identityDbContext)
            {
                this.context = context;
                this.mapper = mapper;
                this.accessor = accessor;
                this.identityDbContext = identityDbContext;
            }

            public async Task<Result<CommentDTO>> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await context.Products.FindAsync(request.ProductId);
                if (product == null) { return null; }

                var user = await identityDbContext.Users.SingleOrDefaultAsync(c => c.UserName == accessor.HttpContext.User.FindFirstValue(ClaimTypes.Name));
                if (user == null)
                {
                    user = await identityDbContext.Users.SingleOrDefaultAsync(c => c.Email == request.Comment.UserName);
                }
                var comment = new Comment
                {
                    Body = request.Comment.MessageBody,
                    Author = user,
                    Product = product,
                    CreatedAt = DateTime.UtcNow,
                };

                product.Comments.Add(comment);

                var success = await context.SaveChangesAsync() > 0;
                if (success)
                    return Result<CommentDTO>.Success(mapper.Map<CommentDTO>(comment));

                return Result<CommentDTO>.Fail("Failed to add comment");
            }
        }
    }
}
