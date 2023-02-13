using System.Collections.Generic;
using System.Linq;

namespace WebApi.Domain.Core
{
    public class Result<T> where T : class
    {
        private Result(T value)
        {
            IsSuccess = true;
            Value = value;
        }

        private Result(bool isSuccess, string message, IEnumerable<T> errors = null)
        {
            IsSuccess = isSuccess;
            Message = message;
            Errors = errors ?? Enumerable.Empty<T>();
        }

        public string Message { get; }

        public bool IsSuccess { get; }

        public T Value { get; set; }

        public IEnumerable<T> Errors { get; }

        public static Result<T> Success(T value) => new(value);

        public static Result<T> Fail(string message, IEnumerable<T> errors = null)
            => new(false, message, errors);

        public static Result<Error> Fail(FluentValidation.Results.ValidationResult validationResult)
            => new(
                false,
                string.Join(", ", validationResult.Errors.Select(x => x.ErrorMessage)),
                validationResult.Errors.Select(x => new Error(x.PropertyName, x.ErrorMessage))
            );

        public class Error
        {
            public Error(string propertyName, string message)
            {
                PropertyName = propertyName;
                Message = message;
            }

            public string PropertyName { get; }
            public string Message { get; }
        }
    }
}
