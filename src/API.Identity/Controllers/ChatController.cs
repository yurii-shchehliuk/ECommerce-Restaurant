using API.Identity.Dtos;
using API.Identity.Functions.CommentFunc.Commands;
using API.Identity.Functions.CommentFunc.Queries;
using API.Identity.SignalR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using WebApi.Infrastructure.Controllers;

namespace API.Identity.Controllers
{
    public class ChatController : BaseApiControllerV1
    {
        private readonly IHubContext<ChatHub> hubContext;

        public ChatController(IHubContext<ChatHub> hubContext)
        {
            this.hubContext = hubContext;
        }

        [HttpPost]
        [Route("send")]
        public async Task NewMessage([FromBody] CommentDTO msg)
        {
            await hubContext.Clients.All.SendAsync("AllMessages", msg);
        }

        /// <summary>
        /// e.g. comments
        /// </summary>
        [HttpPost]
        [Route("group")]
        public async Task GroupMessage([FromBody] CommentDTO msg)
        {
            //await hubContext.Clients.Group(msg.GroupName).SendAsync("CreateMessage", msg);
            var msgResult = await Mediator.Send(new CommentCreate.Command { Comment = msg, ProductId = Convert.ToInt32(msg.GroupName) });
            if (msgResult.IsSuccess)
            {
                var result = await Mediator.Send(new CommentsList.Query { ProductId = Convert.ToInt32(msgResult.Value.GroupName) });
                await hubContext.Clients.Group(msg.GroupName).SendAsync("GetGroupMessages", result.Value);
            }
        }

        [HttpGet("groupId")]
        public async Task GetMessages(string groupId)
        {
            var result = await Mediator.Send(new CommentsList.Query { ProductId = Convert.ToInt32(groupId) });
            await hubContext.Clients.Group(groupId.ToString()).SendAsync("GetGroupMessages", result.Value);
        }
    }
}
