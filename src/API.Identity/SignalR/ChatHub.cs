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
    /// <summary>
    /// 
    /// </summary>
    /// <info>this staff should be invoked</info>
    public class ChatHub : Hub
    {
        private readonly IMediator mediator;

        public ChatHub(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task JoinToGroup(string groupName)
        {
            await this.Groups.AddToGroupAsync(
                this.Context.ConnectionId, groupName);
        }

        public async Task LeaveGroup(string groupName)
        {
            await Clients.Group(groupName).SendAsync("LeaveGroup", groupName);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        //public override async Task OnConnectedAsync()
        //{
        //    try
        //    {
        //        //var httpContext = Context.GetHttpContext();
        //        //var productId = httpContext.Request.Query["productId"];
        //        //if (productId.Count <1)
        //        //{
        //        //    productId = httpContext.Request.Query["id"];

        //        //}
        //        //await JoinToGroup(productId.ToString());

        //        //var result = await mediator.Send(new CommentsList.Query { Id = System.Convert.ToInt32(productId) });
        //        //await Clients.Caller.SendAsync("GetGroupMessages", result.Value);
        //        await base.OnConnectedAsync();

        //    }
        //    catch (Exception ex)
        //    {
        //        Log.Error("OnConnectedAsync {0},\n{1}", ex.Message, ex.StackTrace);
        //        throw ex;
        //    }
        //}
    }
}
