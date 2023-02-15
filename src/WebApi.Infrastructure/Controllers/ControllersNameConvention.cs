using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System;

namespace WebApi.Infrastructure.Controllers
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public class ControllersNameConvention : Attribute, IControllerModelConvention
    {
        public void Apply(ControllerModel controller)
        {
            if (!controller.ControllerType.IsGenericType || controller.ControllerType.GetGenericTypeDefinition() != typeof(GenericController<>))
            {
                return;
            }
            var entityType = controller.ControllerType.GenericTypeArguments[0];
            controller.ControllerName = entityType.Name;
            controller.RouteValues["Controller"] = entityType.Name;
        }
    }
}