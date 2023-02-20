using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Domain.Interfaces.Services;

namespace WebApi.Infrastructure.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseIdentityController<T> : ControllerBase where T : class
    {
        protected UserManager<AppUser> UserManager => _userManager ??= HttpContext.RequestServices.GetService<UserManager<AppUser>>();
        protected SignInManager<AppUser> SignInManager => _signInManager ??= HttpContext.RequestServices.GetService<SignInManager<AppUser>>();
        protected RoleManager<AppRole> RoleManager => _roleManager ??= HttpContext.RequestServices.GetService<RoleManager<AppRole>>();
        protected ITokenService TokenService => _tokenService ??= HttpContext.RequestServices.GetService<ITokenService>();
        protected ILogger<T> Logger => _logger ??= (_logger = HttpContext.RequestServices.GetService<ILogger<T>>());
        protected IIdentityGenericRepository<T> _context => context ??= HttpContext.RequestServices.GetService<IIdentityGenericRepository<T>>();

        private IIdentityGenericRepository<T> context;
        private UserManager<AppUser> _userManager;
        private SignInManager<AppUser> _signInManager;
        private RoleManager<AppRole> _roleManager;
        private ITokenService _tokenService;
        private ILogger<T> _logger;


        public BaseIdentityController(IIdentityGenericRepository<T> context = null,
            UserManager<AppUser> userManager = null,
            SignInManager<AppUser> signInManager = null,
            RoleManager<AppRole> roleManager = null,
            ITokenService tokenService = null,
            ILogger<T> logger = null)
        {
            this.context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
            _logger = logger;
        }

        [HttpGet]
        public virtual async Task<IEnumerable<T>> GetAll()
        {
            return await _context.ListAllAsync();
        }

        [HttpGet("{id}")]
        public virtual async Task<T> Get(string id)
        {
            return await _context.FindByIdAsync(id);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Post([FromBody] T record)
        {
            await _context.AddAsync(record);
            return Ok();
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Update(string id, [FromBody] T record)
        {
            await _context.Update(record);
            return Ok();
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(string id)
        {
            await _context.DeleteAsync(id);
            return Ok();
        }
    }
}
