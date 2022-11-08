using Microsoft.Extensions.Configuration;
using WebApi.Domain.Entities.Identity;
using WebApi.Infrastructure.Services;
using Xunit;

namespace WebApi.Test
{
    /// <example>
    /// + Algorithms, behaviour or rules
    /// - Data access, UI, sustem interactions
    /// </example>
    public class TokenServiceTest
    {
        [Fact]
        public void Token_CreateToken_MustReturnTokenString()
        {
            //arrange
            AppUser user = new AppUser()
            {
                Email = "bob@example.com",
                DisplayName = "Bob"
            };
            TokenService tokenService = new TokenService("super secret test key", "issuer");

            //act
            var result = tokenService.CreateToken(user);

            //assert
            Assert.NotEmpty(result);
            Assert.IsType<string>(result);
            Assert.DoesNotContain("Bearer", result);
        }
    }
}