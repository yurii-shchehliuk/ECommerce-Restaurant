using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
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
        // TokenService signs with HS512, so the key must be at least 512 bits
        // (RFC 7518 s3.2). This is a throwaway value used only by these tests.
        private const string TestKey =
            "test-only-key-not-a-secret-0123456789-0123456789-0123456789-0123456789";
        private const string TestIssuer = "https://localhost:5041";

        private static TokenService CreateSut() =>
            new TokenService(new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string>
                {
                    ["Token:Key"] = TestKey,
                    ["Token:Issuer"] = TestIssuer
                })
                .Build());

        [Fact]
        public void CreateToken_ReturnsBareJwt_WithoutBearerPrefix()
        {
            var result = CreateSut().CreateToken(new List<Claim>());

            Assert.NotEmpty(result);
            Assert.DoesNotContain("Bearer", result);
            // A JWS is three base64url segments separated by dots.
            Assert.Equal(3, result.Split('.').Length);
        }

        [Fact]
        public void CreateToken_IsValidatableWithTheSameKeyAndIssuer()
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, "bob@example.com"),
                new Claim(JwtRegisteredClaimNames.NameId, "user-1"),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var token = CreateSut().CreateToken(claims);

            // This is the contract that matters: a token minted by API.Identity has to
            // survive validation in API.Basket / API.Admin, which use the same key,
            // the same issuer, and do not validate the audience.
            var parameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TestKey)),
                ValidateIssuer = true,
                ValidIssuer = TestIssuer,
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(5)
            };

            var principal = new JwtSecurityTokenHandler()
                .ValidateToken(token, parameters, out var validated);

            Assert.Equal(SecurityAlgorithms.HmacSha512, ((JwtSecurityToken)validated).Header.Alg);
            // Inbound claim mapping rewrites the short JWT names to the long ClaimTypes URIs.
            Assert.Equal("bob@example.com", principal.FindFirstValue(ClaimTypes.Email));
            Assert.Equal("user-1", principal.FindFirstValue(ClaimTypes.NameIdentifier));
            Assert.True(principal.IsInRole("Admin"));
        }

        [Fact]
        public void AnUndersizedKeyIsAcceptedSilently_WhichIsHowTheDefectSurvived()
        {
            // Characterisation test, not an aspiration. "super secret key" is the value
            // this repo shipped for years: 16 bytes / 128 bits, signing with HS512, which
            // RFC 7518 s3.2 says needs a key at least as large as the hash output (512 bits).
            //
            // It does not throw. The token library enforces a blanket minimum key size
            // rather than the per-algorithm minimum, so a key that clears the floor but
            // not the requirement produces a perfectly well-formed, weaker-than-advertised
            // token. That silence is the actual defect - the short key was only ever
            // going to be caught by someone reading the config, which is what happened.
            //
            // If a future upgrade of Microsoft.IdentityModel starts rejecting this,
            // this test failing is good news. Fix it by deleting it.
            var sut = new TokenService(new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string>
                {
                    ["Token:Key"] = "super secret key",
                    ["Token:Issuer"] = TestIssuer
                })
                .Build());

            var token = sut.CreateToken(new List<Claim>());

            Assert.NotEmpty(token);
            Assert.Equal(
                SecurityAlgorithms.HmacSha512,
                new JwtSecurityTokenHandler().ReadJwtToken(token).Header.Alg);
        }
    }
}
