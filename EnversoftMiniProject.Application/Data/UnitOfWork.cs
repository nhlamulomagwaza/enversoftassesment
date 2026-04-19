using EnversoftMiniProject.Application.Interfaces;
using EnversoftMiniProject.Application.Repositories; 

namespace EnversoftMiniProject.Application.Data
{

    //Unit of work is a clean architecture design pattern that helps to manage transactions and coordinate the work of multiple repositories. In my
    //case I only have one repository, but I implemented it anyway to demonstrate how it works and to make it easier to add more repositories in the future if needed.
    //It also helps to ensure that all changes to the database are made in a single transaction, which can help to prevent data inconsistencies and improve performance.
    //The best way I can explain is that nothing is saved to the database unless you give it everything it needs at once. It's why I implemented it

    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        public ISupplierRepository Suppliers { get; private set; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
          
            Suppliers = new SupplierRepository(_context);
        }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}