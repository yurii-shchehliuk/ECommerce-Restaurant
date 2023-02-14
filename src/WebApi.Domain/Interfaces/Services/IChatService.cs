using System.Threading;
using System.Threading.Tasks;

namespace WebApi.Domain.Interfaces.Services
{
    public interface IChatService
    {
        Task StartAsync(CancellationToken cancellationToken);

        Task StopAsync(CancellationToken cancellationToken);
    }
}
