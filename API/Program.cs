using API.Extensions;
using API.Middleware;
using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

internal class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        //services writed in extension method AddApplicationServices which belongs to extensins namespace
        builder.Services.AddApplicationServices(builder.Configuration);

        builder.Services.AddIdentityServices(builder.Configuration);
        builder.Services.AddControllers();
        builder.Services.AddSwaggerDocumentation();

        var app = builder.Build();


        // Configure the HTTP request pipeline.
        app.UseMiddleware<ExceptionMiddleware>();
        app.UseStatusCodePagesWithReExecute("/errors/{0}");

        
        

        app.UseHttpsRedirection();
        app.UseSwaggerDocumentation();

        app.UseStaticFiles();
        app.UseCors("CorsPolicy");

        app.UseAuthentication();

        app.UseAuthorization();

        app.MapControllers();
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<StoreContext>();
        var identityContext = services.GetRequiredService<AppIdentityDbContext>();
        var userManager = services.GetRequiredService<UserManager<AppUser>>();
        var logger = services.GetRequiredService<ILogger<Program>>();
        try
        {
            await context.Database.MigrateAsync();
            await identityContext.Database.MigrateAsync();
            await StoreContextSeed.SeedAsync(context);
            await AppIdentityDbContextSeed.SeedUsersAsync(userManager);
        }
        catch (Exception e)
        {
            logger.LogError(e, "An Error occured during migration");
        }
        app.Run();
    }
}