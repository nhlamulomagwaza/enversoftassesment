using AutoMapper;
using EnversoftMiniProject.Application.Entities; 
using EnversoftMiniProject.Application.DTOs;

namespace EnversoftMiniProject.Application.Mappings
{
    // This class defines the mapping profile for AutoMapper, which is used to map between entities and DTOs.
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
          
            CreateMap<Supplier, SupplierDto>().ReverseMap();
        }
    }
}