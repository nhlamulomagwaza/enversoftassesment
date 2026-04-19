namespace EnversoftMiniProject.Application.Interfaces;

public interface IUnitOfWork : IDisposable
{
    ISupplierRepository Suppliers { get; }
    
    Task<int> CompleteAsync();
}