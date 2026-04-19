namespace EnversoftMiniProject.Application.DTOs
{
    public class SupplierDto
    {
        public int Id { get; set; }
        public required string CompanyName { get; set; }
        public required string TelephoneNumber { get; set; }
    }
}