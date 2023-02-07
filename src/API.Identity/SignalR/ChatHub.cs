using API.Identity.Dtos;
using API.Identity.Functions.CommentFunc.Commands;
using API.Identity.Functions.CommentFunc.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Serilog;
using System;
using System.Threading.Tasks;

namespace API.Identity.SignalR
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
            await Clients.All.SendAsync("MessageReceived", message.MessageBody, message.UserName, message.CreatedAt);
        }

        public async Task NewComment(CommentCreate.Command command)
        {
            var comment = await mediator.Send(command);

            await Clients.Group(command.ProductId.ToString())
                .SendAsync("ReceiveComment", comment.Value);

        }

        public async Task RegisterForFeed(string groupName)
        {
            await this.Groups.AddToGroupAsync(
                this.Context.ConnectionId, groupName);
        }

        public override async Task OnConnectedAsync()
        {
            try
            {
                var httpContext = Context.GetHttpContext();
                //var productId = httpContext.Request.Query["productId"];
                int productId = 5;
                await Groups.AddToGroupAsync(Context.ConnectionId, productId.ToString());

                var result = await mediator.Send(new CommentsList.Query { Id = System.Convert.ToInt32(productId) });
                await Clients.Caller.SendAsync("LoadComments", result.Value);

            }
            catch (Exception ex)
            {
                Log.Error("OnConnectedAsync {0},\n{1}", ex.Message, ex.StackTrace);
                throw ex;
            }
        }
    }
}
