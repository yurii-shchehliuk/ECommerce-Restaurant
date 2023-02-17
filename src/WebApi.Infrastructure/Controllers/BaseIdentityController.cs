using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Interfaces.Services;

namespace WebApi.Infrastructure.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseIdentityController<T> : ControllerBase
    {
        protected UserManager<AppUser> UserManager => _userManager ??= HttpContext.RequestServices.GetService<UserManager<AppUser>>();
        protected SignInManager<AppUser> SignInManager => _signInManager ??= HttpContext.RequestServices.GetService<SignInManager<AppUser>>();
        protected RoleManager<AppRole> RoleManager => _roleManager ??= HttpContext.RequestServices.GetService<RoleManager<AppRole>>();
        protected ITokenService TokenService => _tokenService ??= HttpContext.RequestServices.GetService<ITokenService>();
        protected ILogger<T> Logger => _logger ??= (_logger = HttpContext.RequestServices.GetService<ILogger<T>>());

        private UserManager<AppUser> _userManager;
        private SignInManager<AppUser> _signInManager;
        private RoleManager<AppRole> _roleManager;
        private ITokenService _tokenService;
        private ILogger<T> _logger;


        public BaseIdentityController(UserManager<AppUser> userManager = null,
            SignInManager<AppUser> signInManager = null,
            RoleManager<AppRole> roleManager = null,
            ITokenService tokenService = null,
            ILogger<T> logger = null)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
            _logger = logger;
        }
    }
}
