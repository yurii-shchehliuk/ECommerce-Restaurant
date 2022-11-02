using System.Threading.Tasks;

namespace WebApi.Infrastructure.SignalR
{
    public interface IChatHub
    {
        Task Send(string message, string userName);
    }
}
