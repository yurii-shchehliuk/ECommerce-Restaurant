using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Infrastructure.SignalR
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(MessageVM message)
        {
            await this.Clients.All.SendAsync("MessageReceived", message.Message, message.UserName, message.Date);
        }
    }
}
