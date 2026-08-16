using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Interfaces.Services;

namespace WebApi.Infrastructure.Controllers
{
    /// <summary>
    /// Shared plumbing for the identity controllers: the ASP.NET Core Identity managers,
    /// the token service, and a logger categorised by the deriving controller.
    ///
    /// The managers are resolved from the request's service provider on first use rather
    /// than injected, so a controller that needs one of them declares only the
    /// constructor parameters it uses. <typeparamref name="T"/> gives
    /// <see cref="Logger"/> its category.
    ///
    /// This class contributes no actions. Every route under an identity controller is
    /// declared on that controller, next to the <c>[Authorize]</c> that governs it, so
    /// nothing reaches the identity database through a route nobody wrote.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseIdentityController<T> : ControllerBase where T : class
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

        public BaseIdentityController(
            UserManager<AppUser> userManager = null,
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
