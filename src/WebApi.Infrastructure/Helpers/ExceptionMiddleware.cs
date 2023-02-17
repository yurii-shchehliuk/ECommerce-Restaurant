using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using WebApi.Domain.Core;

namespace WebApi.Infrastructure.Helpers
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                var user = context.User;
                context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                await _next(context);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "ExceptionMiddleware");
                //_logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = Result<string>.Fail((int)HttpStatusCode.InternalServerError, new string[] { ex.Message, ex.StackTrace });

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}