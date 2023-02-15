using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Infrastructure.Controllers
{
    [Authorize]
    public class BaseApiAuthorizeController : BaseApiController
    {
    }
}
