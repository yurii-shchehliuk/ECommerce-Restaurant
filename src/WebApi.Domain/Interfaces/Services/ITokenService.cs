using WebApi.Domain.Entities.Identity;

namespace WebApi.Domain.Interfaces.Services
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}