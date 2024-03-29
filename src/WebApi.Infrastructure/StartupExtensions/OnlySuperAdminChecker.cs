﻿using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace WebApi.Infrastructure.StartupExtensions
{
    internal class OnlySuperAdminChecker : AuthorizationHandler<OnlySuperAdminChecker>, IAuthorizationRequirement
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OnlySuperAdminChecker requirement)
        {
            if (context.User.IsInRole("Super"))
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
