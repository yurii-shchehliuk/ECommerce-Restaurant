using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Infrastructure.Controllers;

namespace API.Identity.Controllers
{
    public class RoleClaimsController : BaseIdentityController<AppRoleClaim>
    {
        public RoleClaimsController(IIdentityGenericRepository<AppRoleClaim> context) : base(context)
        {
        }
    }
}
