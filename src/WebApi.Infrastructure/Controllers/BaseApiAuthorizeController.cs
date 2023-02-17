using Microsoft.AspNetCore.Authorization;

namespace WebApi.Infrastructure.Controllers
{
    [Authorize]
    public class BaseApiAuthorizeController : BaseApiController
    {
    }
}
