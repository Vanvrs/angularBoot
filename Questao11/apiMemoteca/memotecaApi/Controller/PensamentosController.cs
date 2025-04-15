using Microsoft.AspNetCore.Mvc;
using PensamentosApi.Domain;
using PensamentosAPI.Dto;
using PensamentosAPI.Services.Interfaces;

namespace PensamentosAPI.Controllers
{
    [Route("api/pensamentos")]
    [ApiController]
    public class PensamentosController : ControllerBase
    {
        private readonly IPensamentoService _service;

        public PensamentosController(IPensamentoService service)
        {
            _service = service;
        }


        [HttpGet("{pagina:int}/{quantidade:int}")]
        public async Task<IActionResult> BuscarPensamentosPorPaginaAsync(int pagina, int quantidade)
        {
            try
            {
                var pensamentosPaginados = await _service.ListarPaginadoAsync(pagina, quantidade);

                if (pensamentosPaginados == null || pensamentosPaginados.Itens == null || !pensamentosPaginados.Itens.Any())
                {
                    return NotFound(new
                    {
                        success = false,
                        error = "Nenhum pensamento encontrado para os critérios informados."
                    });
                }

                return Ok(new
                {
                    success = true,
                    data = pensamentosPaginados
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    success = false,
                    error = $"Erro interno: {ex.Message}"
                });
            }
        }

        [HttpGet]
        public async Task<ActionResult<dynamic>> ListarTodos()
        {
            try
            {
                var pensamentos = await _service.ListarTodosAsync();
                return Ok(new { success = true, data = pensamentos });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<dynamic>> ObterPorId(int id)
        {
            try
            {
                var pensamento = await _service.ObterPorIdAsync(id);
                if (pensamento == null)
                    return NotFound(new { success = false, error = "Pensamento não encontrado" });

                return Ok(new { success = true, data = pensamento });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<dynamic>> Inserir([FromBody] PensamentoInsercaoDto dto)
        {
            try
            {
                var pensamento = new Pensamento
                {
                    PensamentoDoAutor = dto.PensamentoDoAutor,
                    NomeAutor = dto.NomeAutor,
                    Modelo = dto.Modelo
                };

                var resultado = await _service.InserirAsync(pensamento);
                if (!resultado)
                    return BadRequest(new { success = false, error = "Falha ao inserir pensamento" });

                return CreatedAtAction(nameof(ObterPorId), new { id = pensamento.Id }, new { success = true, data = pensamento });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, error = ex.Message });
            }
        }

        [HttpPut]
        public async Task<ActionResult<dynamic>> Atualizar([FromBody] PensamentoAtualizacaoDto dto)
        {
            try
            {
                var pensamento = new Pensamento
                {
                    Id = dto.Id,
                    PensamentoDoAutor = dto.PensamentoDoAutor,
                    NomeAutor = dto.NomeAutor,
                    Modelo = dto.Modelo
                };

                var resultado = await _service.AtualizarAsync(pensamento);
                if (!resultado)
                    return NotFound(new { success = false, error = "Pensamento não encontrado" });

                return Ok(new { success = true, data = pensamento });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<dynamic>> Excluir(int id)
        {
            try
            {
                var resultado = await _service.ExcluirAsync(id);
                if (!resultado)
                    return NotFound(new { success = false, error = "Pensamento não encontrado" });

                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, error = ex.Message });
            }
        }
    }
}