using Infrastructure.SignalR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
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
        public async Task NewMessage([FromBody] MessageVM msg)
        {
            await _hubContext.Clients.All.SendAsync("MessageReceived", msg.UserName, msg.Message, msg.Date);
        }
    }
}
