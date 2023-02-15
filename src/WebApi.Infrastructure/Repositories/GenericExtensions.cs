using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Infrastructure.Repositories
{
    internal static class GenericExtensions
    {
        public static T RemoveId<T>(this T entity)
        {
            var propertyInfo = entity.GetType().GetProperty("Id");
            if (propertyInfo != null)
            {
                switch (propertyInfo.PropertyType.Name)
                {
                    case "Int32":
                        propertyInfo.SetValue(entity, Convert.ChangeType(0, propertyInfo.PropertyType), null);
                        break;
                    case "string":
                        propertyInfo.SetValue(entity, Convert.ChangeType("", propertyInfo.PropertyType), null);
                        break;
                    default:
                        break;
                }
            }
            return entity;
        }
    }
}