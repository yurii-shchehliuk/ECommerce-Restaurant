using System.Collections.Generic;
using System.Linq;

namespace WebApi.Domain.Core
{
    public class Result<T> where T : class
    {
        private Result(bool isSuccess, string message, IEnumerable<Error> errors)
        {
            IsSuccess = isSuccess;
            Message = message;
            Errors = errors;
        }

        private Result(bool isSuccess, T value)
        {
            IsSuccess = isSuccess;
            Value = value;
        }

        public string Message { get; }

        public bool IsSuccess { get; }

        public T Value { get; set; }

        public IEnumerable<Error> Errors { get; }

        public static Result<T> Success(T value) => new Result<T>(true, value);

        public static Result<T> Fail(string message)
            => new Result<T>(false, message, Enumerable.Empty<Error>());

        public static Result<T> Fail(FluentValidation.Results.ValidationResult validationResult)
            => new Result<T>(
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
