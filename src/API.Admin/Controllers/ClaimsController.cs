using Microsoft.AspNetCore.Authorization;
using WebApi.Domain.Constants;
using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Entities.Identity.Enums;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Infrastructure.Controllers;

namespace API.Identity.Controllers
{
    [Authorize(Roles = UserRole.Admin)]
    public class ClaimsController : GenericController<object>
    {
        public ClaimsController(IGenericRepository<object> context) : base(context)
        {
        }
    }
}
