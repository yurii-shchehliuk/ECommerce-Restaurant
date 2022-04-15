using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.SignalR
{
    public interface IChatHub
    {
        Task Send(string message, string userName);
    }
}
