using System.Threading.Tasks;

namespace API.Identity.SignalR
{
    public interface IChatHub
    {
        Task Send(string message, string userName);
    }
}
