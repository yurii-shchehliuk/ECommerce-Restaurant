using System.Collections.Generic;
using System.Security.Claims;

namespace WebApi.Domain.Interfaces.Services
{
    public interface ITokenService
    {
        string CreateToken(List<Claim> claims);
    }
}