using API.Web.Functions.CommentFunc.Commands;
using API.Web.Functions.CommentFunc.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace WebApi.Infrastructure.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator mediator;

        public ChatHub(IMediator mediator)
        {
            this.mediator = mediator;
        }
        public async Task NewMessage(CommentDTO message)
        {
            await Clients.All.SendAsync("MessageReceived", message.Body, message.UserName, message.CreatedAt);
        }

        public async Task NewComment(CommentCreate.Command command)
        {
            var comment = await mediator.Send(command);

            await Clients.Group(command.ProductId.ToString())
                .SendAsync("CommentCreated", comment.Value);

        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var productId = httpContext.Request.Query["productId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, productId);

            var result = await mediator.Send(new CommentsList.Query { Id = System.Convert.ToInt32(productId) });
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}
