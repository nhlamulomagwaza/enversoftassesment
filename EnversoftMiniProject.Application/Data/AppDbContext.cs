using Microsoft.EntityFrameworkCore;
using EnversoftMiniProject.Application.Entities;

namespace EnversoftMiniProject.Application.Data
{
    // This class represents the database context for the application,
    // it is responsible for managing the connection to the database and providing access to the entities through DbSet properties.
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Supplier> Suppliers { get; set; }
    }
}