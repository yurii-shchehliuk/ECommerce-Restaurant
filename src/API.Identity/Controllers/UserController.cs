using API.Identity.Dtos;
using API.Identity.Helpers;
using API.Identity.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApi.Domain.Constants;
using WebApi.Domain.Core;
using WebApi.Domain.DTOs;
using WebApi.Domain.Entities.Identity;
using WebApi.Infrastructure.Controllers;

namespace API.Identity.Controllers
{
    [AllowAnonymous]
    public class UserController : BaseIdentityController<UserController>
    {
        private readonly IEmailSender _emailSender;
        private readonly IMapper _mapper;
        public UserController(IEmailSender emailSender, IMapper mapper)
        {
            _emailSender = emailSender;
            _mapper = mapper;
        }

        [HttpGet("GetCurrentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await UserManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            if (user == null)
                return NotFound(Result<LoginVM>.Fail("Invalid credentials"));

            return new UserDto
            {
                Email = user.Email,
                Token = TokenService.CreateToken(await GetValidClaims(user)),
                DisplayName = user.DisplayName,
                IsAdmin = user.IsAdmin
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await UserManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await UserManager.FindByUserByClaimsPrincipleWithAddressAsync(HttpContext.User);

            return _mapper.Map<Address, AddressDto>(user.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await UserManager.FindByUserByClaimsPrincipleWithAddressAsync(HttpContext.User);


            user.Address = _mapper.Map<AddressDto, Address>(address);

            var result = await UserManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

            return BadRequest("Problem updating the user");
        }

        [HttpPost("login")]

        public async Task<ActionResult<UserDto>> Login(LoginVM loginVM)
        {
            var user = await UserManager.FindByEmailAsync(loginVM.Email);

            if (user == null) return NotFound(Result<LoginVM>.Fail("Invalid credentials"));
            if (!await UserManager.IsEmailConfirmedAsync(user))
            {
                var confirmation = await UserManager.ConfirmEmailAsync(user, UserManager.GenerateEmailConfirmationTokenAsync(user).Result);
                if (!confirmation.Succeeded)
                {
                    return Unauthorized(Result<LoginVM>.Fail("User cannot sign in without a confirmed account"));
                }
            }

            var result = await SignInManager.CheckPasswordSignInAsync(user, loginVM.Password, false);
            if (result.IsLockedOut)
                return Unauthorized(Result<LoginVM>.Fail("Account temporarily locked"));

            if (!result.Succeeded) return Unauthorized(Result<LoginVM>.Fail("Invalid login attempt"));
            //await _userManager.AddClaimAsync(user, ClasimStore.claimList.First());

            return new UserDto
            {
                Email = user.Email,
                Token = TokenService.CreateToken(await GetValidClaims(user)),
                DisplayName = user.DisplayName,
                IsAdmin = user.IsAdmin
            };
        }

        [HttpPost("register")]
        [ValidateAntiForgeryToken]

        public async Task<ActionResult<UserDto>> Register(RegisterVM registerDTO)
        {
            if (CheckEmailExistsAsync(registerDTO.Email).Result.Value)
            {
                return new BadRequestObjectResult(Result<RegisterVM>.Fail("Email address is in use"));
            }

            var user = new AppUser
            {
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                UserName = registerDTO.Email,
                IsAdmin = false
            };

            var result = await UserManager.CreateAsync(user, registerDTO.Password);

            if (!result.Succeeded) return BadRequest(Result<IdentityError>.Fail("Error appeared on creating", result.Errors));
            await UserManager.AddToRoleAsync(user, UserRole.User);
            var emailConfirmToken = await UserManager.GenerateEmailConfirmationTokenAsync(user);
            //_emailSender.SendEmailAsync(user.Email, "Register account", $"<a href=\"{emailConfirmToken}\">Click to confirm account</a>");

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = TokenService.CreateToken(await GetValidClaims(user)),
                Email = user.Email
            };
        }


        [HttpPost("ForgotPassword")]
        public async Task<ActionResult<UserDto>> ForgotPassword(ForgotPasswordVM forgotPwd)
        {
            var user = await UserManager.FindByEmailAsync(forgotPwd.Email);
            if (user == null)
                return NotFound(Result<LoginVM>.Fail("Invalid credentials"));

            var token = await UserManager.GeneratePasswordResetTokenAsync(user);
            ///<todo>email sender i.e.smtp4dev or MailJet+Protonmail</todo>
            //_emailSender.SendEmailAsync(user.Email, "Reset password", $"<a href=\"{token}\">Click to reset password</a>");
            return Ok();
        }

        [HttpPost("ResetPassword")]
        public async Task<ActionResult<UserDto>> ResetPassword(ResetPasswordVM resetPwd)
        {
            var user = await UserManager.FindByEmailAsync(resetPwd.Email);
            if (user == null)
                return NotFound(Result<LoginVM>.Fail("Invalid credentials"));

            var result = await UserManager.ResetPasswordAsync(user, resetPwd.Token, resetPwd.Password);
            if (!result.Succeeded) return BadRequest(Result<IdentityError>.Fail("Cannot reset password", result.Errors));
            return Ok();
        }

        [HttpGet("ConfirmEmail")]
        public async Task<ActionResult<UserDto>> ConfirmEmail(string userEmail, string token)
        {
            if (string.IsNullOrEmpty(userEmail) || string.IsNullOrEmpty(token))
            {
                return BadRequest(Result<IdentityError>.Fail("Parameter is empty"));
            }
            var user = await UserManager.FindByEmailAsync(userEmail);
            if (user == null)
                return NotFound(Result<LoginVM>.Fail("Invalid credentials"));

            var result = await UserManager.ConfirmEmailAsync(user, token);
            if (!result.Succeeded) return BadRequest(Result<IdentityError>.Fail("Cannot reset password", result.Errors));
            return Ok();
        }

        ///<todo>External logins, e.g. google/facebook</todo>
        ///<todo>Two factor authentication</todo>
        ///<todo>crud user claims</todo>


        private async Task<List<Claim>> GetValidClaims(AppUser user)
        {
            IdentityOptions _options = new IdentityOptions();
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.GivenName, user.DisplayName),
                new Claim(_options.ClaimsIdentity.UserIdClaimType, user.Id.ToString()),
                new Claim(_options.ClaimsIdentity.UserNameClaimType, user.UserName)
            };
            var userClaims = await UserManager.GetClaimsAsync(user);
            var userRoles = await UserManager.GetRolesAsync(user);
            claims.AddRange(userClaims);
            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, userRole));
                var role = await RoleManager.FindByNameAsync(userRole);
                if (role != null)
                {
                    var roleClaims = await RoleManager.GetClaimsAsync(role);
                    foreach (Claim roleClaim in roleClaims)
                    {
                        claims.Add(roleClaim);
                    }
                }
            }
            return claims;
        }
    }
}