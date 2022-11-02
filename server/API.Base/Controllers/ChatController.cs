using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using WebApi.Infrastructure.SignalR;

namespace API.Base.Controllers
{
    public class ChatController : BaseApiController
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost]
        [Route("send")]
        public async Task NewMessage([FromBody] MessageViewModel msg)
        {
            await _hubContext.Clients.All.SendAsync("MessageReceived", msg.UserName, msg.Message, msg.Date);
        }
    }
}
