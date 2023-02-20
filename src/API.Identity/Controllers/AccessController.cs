using API.Identity.Dtos;
using API.Identity.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApi.Domain.Constants;
using WebApi.Domain.Core;
using WebApi.Infrastructure.Controllers;

namespace API.Identity.Controllers
{
    [Authorize(Roles = UserRole.Admin)]
    public class AccessController : BaseIdentityController<AccessController>
    {
        [HttpGet("claims/GetUserClaims")]
        public async Task<ActionResult<List<Claim>>> GetUserClaims(UserClaimsVM userClaims)
        {
            var user = await UserManager.FindByEmailAsync(userClaims.UserEmail);
            if (user == null)
                return NotFound(Result<LoginVM>.Fail("Invalid credentials"));


            return Ok(ClasimStore.claimList);
        }

        [HttpPost]
        [Route("claims/AddClaimToUser")]
        public async Task<IActionResult> UpdateClaims(string email, string claimName, string value)
        {
            var user = await UserManager.FindByEmailAsync(email);

            var userClaim = new Claim(claimName, value);

            if (user != null)
            {
                var result = await UserManager.AddClaimAsync(user, userClaim);

                if (result.Succeeded)
                {
                    Log.Information($"the claim {claimName} add to the  User {user.Email}");
                    return Ok(new { result = $"the claim {claimName} add to the  User {user.Email}" });
                }
                else
                {
                    Log.Information($"Error: Unable to add the claim {claimName} to the  User {user.Email}");
                    return BadRequest(Result<string>.Fail($"Error: Unable to add the claim {claimName} to the  User {user.Email}"));
                }
            }

            // User doesn't exist
            return BadRequest(new { error = "Unable to find user" });
        }

        [HttpPost("claims/UpdateRoles")]
        [Authorize(Roles = UserRole.Super)]
        public async Task<ActionResult<UserDto>> UpdateRoles(string email, string roleName)
        {
            var user = await UserManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new BadRequestObjectResult(Result<object>.Fail(404));
            }

            var role = await RoleManager.FindByNameAsync(roleName);
            if (role == null)
                return BadRequest(Result<string>.Fail(404));

            var result = await UserManager.AddToRoleAsync(user, role.Name);

            if (!result.Succeeded)
                return BadRequest(Result<string>.Fail(400));

            return Ok(result);
        }
    }
}
