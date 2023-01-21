using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace WebApi.Infrastructure.SignalR
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(CommentDTO message)
        {
            await Clients.All.SendAsync("MessageReceived", message.Body, message.UserName, message.CreatedAt);
        }
    }
}
