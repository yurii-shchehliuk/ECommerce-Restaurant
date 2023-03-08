using Microsoft.EntityFrameworkCore;
using System;

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

        public static Type GetIdType<T>()
        {
            var inst = (T)Activator.CreateInstance(typeof(T), new object[] { });
            var propVal = inst.GetType().GetProperty("Id").GetValue(inst, null);
            if (propVal == null)
            {
                // t is string
                return typeof(string);
            }
            // t is int
            return typeof(int);
        }
    }
}