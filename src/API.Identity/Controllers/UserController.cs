using API.Identity.Dtos;
using API.Identity.Helpers;
using API.Identity.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApi.Domain.Constants;
using WebApi.Domain.Core;
using WebApi.Domain.DTOs;
using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Entities.Identity.Enums;
using WebApi.Domain.Interfaces.Services;
using WebApi.Infrastructure.Controllers;

namespace API.Identity.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly ITokenService _tokenService;
        private readonly IEmailSender _emailSender;
        private readonly IMapper _mapper;
        public UserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, RoleManager<AppRole> roleManager, ITokenService tokenService, IEmailSender emailSender, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
            _emailSender = emailSender;
            _mapper = mapper;
        }

        [HttpGet("GetCurrentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            if (user == null)
                return NotFound(Result<LoginVM>.Fail("Invalid credentials"));

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName,
                IsAdmin = user.IsAdmin
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await _userManager.FindByUserByClaimsPrincipleWithAddressAsync(HttpContext.User);

            return _mapper.Map<Address, AddressDto>(user.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await _userManager.FindByUserByClaimsPrincipleWithAddressAsync(HttpContext.User);

            user.Address = _mapper.Map<AddressDto, Address>(address);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

            return BadRequest("Problem updating the user");
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> Login(LoginVM loginVM)
        {
            var user = await _userManager.FindByEmailAsync(loginVM.Email);

            if (user == null) return NotFound(Result<LoginVM>.Fail("Invalid credentials"));
            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                var confirmation = await _userManager.ConfirmEmailAsync(user, _userManager.GenerateEmailConfirmationTokenAsync(user).Result);
                if (!confirmation.Succeeded)
                {
                    return Unauthorized(Result<LoginVM>.Fail("User cannot sign in without a confirmed account"));
                }
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginVM.Password, false);
            if (result.IsLockedOut)
                return Unauthorized(Result<LoginVM>.Fail("Account temporarily locked"));

            if (!result.Succeeded) return Unauthorized(Result<LoginVM>.Fail("Invalid login attempt"));

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName,
                IsAdmin = user.IsAdmin
            };
        }

        [HttpPost("register")]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
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

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (!result.Succeeded) return BadRequest(Result<IdentityError>.Fail("Error appeared on creating", result.Errors));
            await _userManager.AddToRoleAsync(user, UserRole.User);
            var emailConfirmToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            //_emailSender.SendEmailAsync(user.Email, "Register account", $"<a href=\"{emailConfirmToken}\">Click to confirm account</a>");

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            };
        }

        [HttpPost("RegisterAdmin")]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        /// with posibility to add the role
        public async Task<ActionResult<UserDto>> RegisterAdmin(RegisterVM registerDTO)
        {
            if (CheckEmailExistsAsync(registerDTO.Email).Result.Value)
            {
                return new BadRequestObjectResult(Result<object>.Fail("Email address is in use"));
            }

            var user = new AppUser
            {
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                UserName = registerDTO.Email,
                IsAdmin = false
            };

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (!result.Succeeded)
                return BadRequest(Result<IdentityError>.Fail(400, result.Errors));

            if (!await _roleManager.RoleExistsAsync(registerDTO.UserRole.ToString()))
                return BadRequest(Result<string>.Fail(400, new string[] { "Selected role doesnt exists" }));

            await _userManager.AddToRoleAsync(user, registerDTO.UserRole.ToString());

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            };
        }


        [HttpPost("ForgotPassword")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> ForgotPassword(ForgotPasswordVM forgotPwd)
        {
            var user = await _userManager.FindByEmailAsync(forgotPwd.Email);
            if (user == null)
                return NotFound(Result<LoginVM>.Fail("Invalid credentials"));

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            ///<todo>email sender i.e.smtp4dev or MailJet+Protonmail</todo>
            //_emailSender.SendEmailAsync(user.Email, "Reset password", $"<a href=\"{token}\">Click to reset password</a>");
            return Ok();
        }

        [HttpPost("ResetPassword")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> ResetPassword(ResetPasswordVM resetPwd)
        {
            var user = await _userManager.FindByEmailAsync(resetPwd.Email);
            if (user == null)
                return NotFound(Result<LoginVM>.Fail("Invalid credentials"));

            var result = await _userManager.ResetPasswordAsync(user, resetPwd.Token, resetPwd.Password);
            if (!result.Succeeded) return BadRequest(Result<IdentityError>.Fail("Cannot reset password", result.Errors));
            return Ok();
        }

        [HttpGet("ConfirmEmail")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> ConfirmEmail(string userEmail, string token)
        {
            if (string.IsNullOrEmpty(userEmail) || string.IsNullOrEmpty(token))
            {
                return BadRequest(Result<IdentityError>.Fail("Parameter is empty"));
            }
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
                return NotFound(Result<LoginVM>.Fail("Invalid credentials"));

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (!result.Succeeded) return BadRequest(Result<IdentityError>.Fail("Cannot reset password", result.Errors));
            return Ok();
        }

        ///<todo>External logins, e.g. google/facebook</todo>
        ///<todo>Two factor authentication</todo>
        ///<todo>crud user claims</todo>

        [HttpGet("claims/GetUserClaims")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Claim>>> GetUserClaims(UserClaimsVM userClaims)
        {
            var user = await _userManager.FindByEmailAsync(userClaims.UserEmail);
            if (user == null)
                return NotFound(Result<LoginVM>.Fail("Invalid credentials"));


            return Ok(ClasimStore.claimList);
        }
    }
}