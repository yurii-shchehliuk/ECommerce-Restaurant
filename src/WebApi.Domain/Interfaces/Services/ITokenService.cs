using System.Collections.Generic;
using System.Security.Claims;
using WebApi.Domain.Entities.Identity;

namespace WebApi.Domain.Interfaces.Services
{
    public interface ITokenService
    {
        string CreateToken(List<Claim> claims);
    }
}