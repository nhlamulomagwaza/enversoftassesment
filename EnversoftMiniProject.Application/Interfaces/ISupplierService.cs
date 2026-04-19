using EnversoftMiniProject.Application.DTOs;

namespace EnversoftMiniProject.Application.Interfaces;

public interface ISupplierService
{
    Task<IEnumerable<SupplierDto>> GetAllAsync();
    
    Task<IEnumerable<SupplierDto>> GetByCompanyNameAsync(string companyName);
    
    Task<SupplierDto?> GetByIdAsync(int id);
    
    Task AddAsync(SupplierDto dto);
    
    Task UpdateAsync(SupplierDto dto);
    
    Task DeleteAsync(int id);
}