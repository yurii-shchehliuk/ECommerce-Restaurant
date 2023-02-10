using API.Identity.Dtos;
using API.Identity.SignalR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Domain.Interfaces.Services;

namespace API.Identity.Services
{
    public class ChatService : IChatService
    {
        private readonly IHubContext<ChatHub> _MessageHubContext;
        private readonly ILogger<ChatService> _logger;
        private readonly System.Timers.Timer _timer;
        private readonly string[] _groups = Data.Groups;
        private readonly string[] _authors = Data.Authors;
        private readonly Random _randomGroup;

        public ChatService(
            IHubContext<ChatHub> MessageHubContext,
            ILogger<ChatService> logger)
        {
            _MessageHubContext = MessageHubContext;
            _logger = logger;
            _timer = new System.Timers.Timer(500);
            _timer.Elapsed += GenerateAndSendMessage;
            _randomGroup = new Random(0);
        }

        private void GenerateAndSendMessage(
            object sender, System.Timers.ElapsedEventArgs e)
        {
            // generate random Message object
            // groupName, postText, timestamp
            var Message = CreateMessageEntity(Guid.NewGuid().ToString());

            // send to all users registered to receive Message from group
            _MessageHubContext.Clients.Group(Message.GroupName).SendAsync("GetGroupMessage", Message);

            // send to all users to receive Message
            _MessageHubContext.Clients.All.SendAsync("GetMessage", Message);
        }

        private CommentDTO CreateMessageEntity(string id)
        {
            var nextGroupIndex = _randomGroup.Next(_groups.Length - 1);
            var nextAuthorIndex = _randomGroup.Next(_authors.Length - 1);

            var author =
              nextAuthorIndex < _authors.Length ? _authors[nextAuthorIndex] : _authors[0];

            var group =
              nextGroupIndex < _groups.Length ? _groups[nextGroupIndex] : _groups[0];

            return new CommentDTO
            {
                Id = id,
                MessageBody = $"Some random post created for {group} by {author} right now. Have a great day!",
                CreatedAt = DateTime.Now,
                UserName = author,
                GroupName = group
            };
        }

        public Task StartAsync(
            CancellationToken cancellationToken)
        {
            _timer.Start();
            return Task.CompletedTask;
        }

        public Task StopAsync(
            CancellationToken cancellationToken)
        {
            _timer.Enabled = false;
            _timer.Dispose();
            return Task.CompletedTask;
        }
    }
    internal class Data
    {
        public static string[] Groups = { "12", "13", "14", "15" };
        public static string[] Authors = { "andrew", "tom", "jerry" };
    }
}
