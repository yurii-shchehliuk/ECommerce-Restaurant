using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Infrastructure.Controllers;

namespace API.Identity.Controllers
{
    public class RolesController : GenericController<AppRole>
    {
        public RolesController(IIdentityGenericRepository<AppRole> context) : base(context)
        {
        }
    }
}
