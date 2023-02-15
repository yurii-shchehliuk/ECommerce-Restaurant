using WebApi.Domain.Constants;
using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Infrastructure.Controllers;

namespace API.Identity.Controllers
{
    public class ClaimsController : GenericController<object>
    {
        public ClaimsController(IGenericRepository<object> context) : base(context)
        {
        }
    }
}
