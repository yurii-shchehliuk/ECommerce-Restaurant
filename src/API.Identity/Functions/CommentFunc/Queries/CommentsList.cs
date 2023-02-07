using API.Identity.SignalR;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Db.Store;
using WebApi.Domain.Core;
using WebApi.Domain.CQRS.QueryHandling;

namespace API.Identity.Functions.CommentFunc.Queries
{
    public class CommentsList
    {
        public class Query : IQuery<Result<List<CommentDTO>>>
        {
            public int Id { get; set; }
        }

        public class Handler : IQueryHandler<Query, Result<List<CommentDTO>>>
        {
            private readonly StoreContext context;
            private readonly IMapper mapper;

            public Handler(StoreContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<Result<List<CommentDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await context.Comments
                    .Where(c => c.Product.Id == request.Id)
                    .OrderBy(c => c.CreatedAt)
                    .ProjectTo<CommentDTO>(mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<CommentDTO>>.Success(comments);
            }
        }
    }
}
