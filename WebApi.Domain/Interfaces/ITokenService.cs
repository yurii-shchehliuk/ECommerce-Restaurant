using WebApi.Domain.Entities.Identity;

namespace WebApi.Domain.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}