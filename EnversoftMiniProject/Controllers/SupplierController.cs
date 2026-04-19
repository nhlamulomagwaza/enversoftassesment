using EnversoftMiniProject.Application.DTOs;
using EnversoftMiniProject.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnversoftMiniProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _service;

        public SupplierController(ISupplierService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Add(SupplierDto dto)
        {
            try
            {
                await _service.AddAsync(dto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<SupplierDto> suppliers = await _service.GetAllAsync();
            return Ok(suppliers);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetByCompanyName([FromQuery] string companyName)
        {
            try
            {
                IEnumerable<SupplierDto> suppliers = await _service.GetByCompanyNameAsync(companyName);
                return Ok(suppliers);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                SupplierDto? supplier = await _service.GetByIdAsync(id);
                return Ok(supplier);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

       [HttpPut("{id}")]
public async Task<IActionResult> Update(int id, [FromBody] SupplierDto dto)
{
    try
    {
        if (id != dto.Id)
        {
            return BadRequest("IDs do not match.");
        }

        await _service.UpdateAsync(dto);
        return Ok();
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
}

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _service.DeleteAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}