using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace WebApi.Infrastructure.SignalR
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(MessageViewModel message)
        {
            await Clients.All.SendAsync("MessageReceived", message.Message, message.UserName, message.Date);
        }
    }
}
