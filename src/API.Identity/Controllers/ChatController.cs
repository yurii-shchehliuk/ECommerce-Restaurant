using API.Identity.Dtos;
using API.Identity.SignalR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace API.Identity.Controllers
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
        public async Task NewMessage([FromBody] CommentDTO msg)
        {
            await _hubContext.Clients.All.SendAsync("MessageReceived", msg.UserName, msg.MessageBody, msg.CreatedAt);
        }

        /// <summary>
        /// e.g. comments
        /// </summary>
        [HttpPost]
        [Route("group")]
        public async Task GroupMessage([FromBody] CommentDTO msg)
        {
            await _hubContext.Clients.Group(msg.GroupName).SendAsync("GetGroupMessages", msg.UserName, msg.MessageBody, msg.CreatedAt);
        }
    }
}
