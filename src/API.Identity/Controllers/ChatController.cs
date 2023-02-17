using API.Identity.Dtos;
using API.Identity.Functions.CommentFunc.Commands;
using API.Identity.Functions.CommentFunc.Queries;
using API.Identity.SignalR;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using WebApi.Infrastructure.Controllers;

namespace API.Identity.Controllers
{
    public class ChatController : BaseApiController
    {
        private readonly IHubContext<ChatHub> hubContext;
        private readonly IMediator mediator;

        public ChatController(IHubContext<ChatHub> hubContext, IMediator mediator)
        {
            this.hubContext = hubContext;
            this.mediator = mediator;
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
            var msgResult = await mediator.Send(new CommentCreate.Command { Comment = msg, ProductId = System.Convert.ToInt32(msg.GroupName) });
            if (msgResult.IsSuccess)
            {
                var result = await mediator.Send(new CommentsList.Query { ProductId = System.Convert.ToInt32(msgResult.Value.GroupName) });
                await hubContext.Clients.Group(msg.GroupName).SendAsync("GetGroupMessages", result.Value);
            }
        }

        [HttpGet("groupId")]
        public async Task GetMessages(string groupId)
        {
            var result = await mediator.Send(new CommentsList.Query { ProductId = System.Convert.ToInt32(groupId) });
            await hubContext.Clients.Group(groupId.ToString()).SendAsync("GetGroupMessages", result.Value);
        }
    }
}
