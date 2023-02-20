using Microsoft.AspNetCore.Authorization;
using WebApi.Domain.Constants;
using WebApi.Infrastructure.Controllers;

namespace API.Identity.Controllers
{
    [Authorize(Roles = UserRole.User)]
    public class AccountController : BaseApiController
    {
        public AccountController()
        {

        }

        //[HttpPost]
        //public async Task UploadPhotos()
        //{

        //}

        //[HttpPut]
        //public async Task ChangeName()
        //{

        //}

        //[HttpPut]
        //public async Task PhoneNumber()
        //{

        //}

        //[HttpPut]
        //public async Task Email()
        //{

        //}

        //[HttpPut]
        //public async Task Password()
        //{

        //}

        //[HttpDelete]
        //public async Task DeleteAccount()
        //{

        //}
    }
}