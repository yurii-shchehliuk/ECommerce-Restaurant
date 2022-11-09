using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Interfaces;
using WebApi.Infrastructure.Helpers;

namespace WebApi.Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        private readonly string _issuer;

        public TokenService(IConfiguration config)
        {
            _issuer = config["Token:Issuer"];
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"]));
        }
        public TokenService(string key, string issuer)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            _issuer = issuer;
        }

        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.GivenName, user.DisplayName)
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
                Issuer = _issuer 
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            string result =  tokenHandler.WriteToken(token);
            return result;
        }

        //public TokenResponse RefreshToken(string refreshToken, string userEmail)
        //{
        //    var token = _tokenHandler.TakeRefreshToken(refreshToken, userEmail);
        //    var user = _userService.FindByEmail(userEmail);
        //    var accessToken = _tokenHandler.CreateAccessToken(user);
        //    return new TokenResponse(true, null, accessToken);
        //}
    }
}