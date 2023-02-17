using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace WebApi.Domain.Core
{
    public class Result<T> where T : class
    {
        private Result(bool isSuccess, T value)
        {
            IsSuccess = isSuccess;
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

        public static Result<T> Success(T value) => new(true, value);
        public static Result<Error> Fail(Error error)
            => new(false, error);

        public static Result<T> Fail(string message, IEnumerable<T> errors = null)
            => new(false, message, errors);

        public static Result<T> Fail(int code, IEnumerable<T> errors = null)
            => new(false, Error.GetDefaultMessageForStatusCode(code), errors);


        public static Result<Error> Fail(FluentValidation.Results.ValidationResult validationResult)
            => new(
                false,
                string.Join(", ", validationResult.Errors.Select(x => x.ErrorMessage)),
                validationResult.Errors.Select(x => new Error(x.PropertyName, x.ErrorMessage))
            );
    }
    public class Error
    {
        public Error(string propertyName, string message)
        {
            PropertyName = propertyName;
            Message = message;
        }
        public Error(int code = 500, string message = null, string stackTrace = null, string[] internalErrors = null)
        {
            Code = code;
            Message = message ?? GetDefaultMessageForStatusCode(code);
            InternalErrors = internalErrors;
            StackTrace = stackTrace;
        }

        public string PropertyName { get; }
        public string Message { get; }
        public int Code { get; }
        public string StackTrace { get; }
        public string[] InternalErrors { get; }

        internal static string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A bad request, you have made",
                401 => "Authorized, you are not",
                404 => "Resource found, it was not",
                500 => "Errors are the path to the dark side. Errors lead to anger.  Anger leads to hate.  Hate leads to career change",
                _ => ((HttpStatusCode)statusCode).ToString()

            };
        }
    }
}
