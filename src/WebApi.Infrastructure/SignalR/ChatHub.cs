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
    }
}
