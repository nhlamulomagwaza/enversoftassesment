using EnversoftMiniProject.Application.Entities;

namespace EnversoftMiniProject.Application.Interfaces;

public interface ISupplierRepository
{
    Task<IEnumerable<Supplier>> GetAllAsync();

    Task<IEnumerable<Supplier>> GetByNameAsync(string name);

    Task<Supplier?> GetByIdAsync(int id);

    Task AddAsync(Supplier supplier);

    Task UpdateAsync(Supplier supplier);

    Task DeleteAsync(int id);
}