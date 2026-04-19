using AutoMapper;
using EnversoftMiniProject.Application.DTOs;
using EnversoftMiniProject.Application.Entities;
using EnversoftMiniProject.Application.Interfaces;
namespace EnversoftMiniProject.Application.Services;

public class SupplierService : ISupplierService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper; 
    public SupplierService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<IEnumerable<SupplierDto>> GetAllAsync()
    {
        IEnumerable<Supplier> suppliers = await _unitOfWork.Suppliers.GetAllAsync();
        return suppliers.Select(_mapper.Map<SupplierDto>);
    }

    public async Task<IEnumerable<SupplierDto>> GetByCompanyNameAsync(string companyName)
    {
        IEnumerable<Supplier> suppliers = await _unitOfWork.Suppliers.GetByNameAsync(companyName);
        return suppliers.Select(_mapper.Map<SupplierDto>);
    }
    public async Task<SupplierDto?> GetByIdAsync(int id)
    {
        Supplier? supplier = await _unitOfWork.Suppliers.GetByIdAsync(id);
        return _mapper.Map<SupplierDto>(supplier);
    }
    public async Task AddAsync(SupplierDto dto)
    {
        Supplier supplier = _mapper.Map<Supplier>(dto);
        
        await _unitOfWork.Suppliers.AddAsync(supplier);
        await _unitOfWork.CompleteAsync();
    }
    public async Task UpdateAsync(SupplierDto dto)
    {
        Supplier? existingSupplier = await _unitOfWork.Suppliers.GetByIdAsync(dto.Id);
        
        if (existingSupplier == null)
        {
            throw new Exception("Supplier not found.");
        }

        _mapper.Map(dto, existingSupplier);

        await _unitOfWork.Suppliers.UpdateAsync(existingSupplier);
        await _unitOfWork.CompleteAsync();
    }

    public async Task DeleteAsync(int id)
    {
        Supplier? existingSupplier = await _unitOfWork.Suppliers.GetByIdAsync(id);
        
        if (existingSupplier == null)
        {
            throw new Exception("Supplier does not exist.");
        }
        await _unitOfWork.Suppliers.DeleteAsync(id);
        await _unitOfWork.CompleteAsync();
    }
}