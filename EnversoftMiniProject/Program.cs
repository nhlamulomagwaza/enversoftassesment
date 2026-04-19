using Microsoft.EntityFrameworkCore;
using EnversoftMiniProject.Application.Data;
using EnversoftMiniProject.Application.Interfaces;
using EnversoftMiniProject.Application.Repositories;
using EnversoftMiniProject.Application.Services;
using EnversoftMiniProject.Application.Mappings;

var builder = WebApplication.CreateBuilder(args);

// This is important, it ensures that the connection string is not null or empty before trying to use it to configure the DbContext.

string? connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString, sqlOptions => 
    {
         // I added this to keep trying the sql server
         //what happens sometimes is that the dot net application may
         //start before the database is ready
        sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5, 
            maxRetryDelay: TimeSpan.FromSeconds(30), 
            errorNumbersToAdd: null);
    }));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(cfg => {
    cfg.AddProfile<MappingProfile>();
}, AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddControllers();
builder.Services.AddScoped<ISupplierRepository, SupplierRepository>();
builder.Services.AddScoped<ISupplierService, SupplierService>();
// This is important for development, it allows the Vite client to make requests to this API without running into CORS issues.
builder.Services.AddCors(options =>
{
    options.AddPolicy("ViteClient", policy =>
    {
        policy.AllowAnyOrigin() //Allowing all origins for development, in production i would specify the exact origin of the Vite client
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // This allows me and others to test this api without even opening postman, got to /Swagger from the root of the api url
}

//The following code ensures that the database is created and migrated to the latest version when the application starts.
//It prevents me from having to run the migrations manually every time i make a change to the database schema,
//and also ensures that the database is always in sync with the latest code changes.

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
       
        context.Database.Migrate(); 
        Console.WriteLine("Database is synced and ready!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred while migrating the database: {ex.Message}");
    }
}

app.UseHttpsRedirection();
app.UseCors("ViteClient");
app.UseAuthorization();
app.MapControllers();
app.Run();