using System.Net;
using System.Text.Json;
using API.Errors;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;

namespace API.Middleware;

public class ExceptionMiddleware
{
    private readonly IHostEnvironment _env;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly RequestDelegate _next;
    public ExceptionMiddleware(RequestDelegate next,ILogger<ExceptionMiddleware> logger,IHostEnvironment env)
    {
        _env = env;
        _logger = logger;
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception e)
        {
           _logger.LogError(e,e.Message);
           context.Response.ContentType = "application/json";
           context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

           var response = _env.IsDevelopment()
               ? new ApiException((int)HttpStatusCode.InternalServerError, e.Message,
                   e.StackTrace.ToString())
               : new ApiException((int)HttpStatusCode.InternalServerError);

           var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
           var json = JsonSerializer.Serialize(response,options);
           await context.Response.WriteAsync(json);
           
        }
    }

   
}