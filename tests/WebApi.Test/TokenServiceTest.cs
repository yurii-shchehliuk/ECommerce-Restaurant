using System.Security.Claims;
using WebApi.Domain.Entities.Identity;
using WebApi.Infrastructure.Services;
using Xunit;

namespace WebApi.Test
{
    /// <example>
    /// + Algorithms, behaviour or rules
    /// - Data access, UI, system interactions
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
            ///<todo>Add a fixture for token service</todo>
            TokenService tokenService = new TokenService(null);

            //act
            var result = tokenService.CreateToken(new List<Claim>());

            //assert
            Assert.NotEmpty(result);
            Assert.IsType<string>(result);
            Assert.DoesNotContain("Bearer", result);
        }
    }
}