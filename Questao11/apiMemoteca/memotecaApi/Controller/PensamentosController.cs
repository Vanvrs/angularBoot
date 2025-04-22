/*using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using PensamentosApi.Domain;
using PensamentosAPI.Dto;
using PensamentosAPI.Services.Interfaces;

namespace PensamentosAPI.Controllers

{   [ApiController]
    [Route("pensamentos")]
    [EnableCors]

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

                return StatusCode( 201, pensamentosPaginados);
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
                return Ok( pensamentos );
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
                    return Ok (pensamento);

                return Ok(new { success = true, data = pensamento });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, error = ex.Message });
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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
                    return StatusCode(400, "Falha ao inserir pensamento" );

                return StatusCode(201, pensamento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Pensamento criado com sucesso");
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

*/

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PensamentosApi.Domain;
using PensamentosAPI.Dto;
using PensamentosAPI.Services.Interfaces;

namespace PensamentosAPI.Controllers
{
    [ApiController]
    [Route("pensamentos")]
    [EnableCors]
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
                    return NotFound(new { error = "Nenhum pensamento encontrado para os critérios informados." });
                }

                return Ok(pensamentosPaginados);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Erro interno: {ex.Message}" });
            }
        }

        [HttpGet]
        public async Task<ActionResult> ListarTodos()
        {
            try
            {
                var pensamentos = await _service.ListarTodosAsync();
                return Ok(pensamentos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult> ObterPorId(int id)
        {
            try
            {
                var pensamento = await _service.ObterPorIdAsync(id);
                if (pensamento == null)
                    return NotFound(new { error = "Pensamento não encontrado" });

                return Ok(pensamento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Inserir([FromBody] PensamentoInsercaoDto dto)
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
                    return BadRequest(new { error = "Falha ao inserir pensamento" });

                return CreatedAtAction(nameof(ObterPorId), new { id = pensamento.Id }, pensamento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }



        [HttpPut("{id}")] 
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> EditarPensamento(int id, [FromBody] PensamentoAtualizacaoDto dto)
        {
            try
            {
                // Verificação adicional
                if (id != dto.Id)
                    return BadRequest("ID não corresponde");

                var pensamento = new Pensamento
                {
                    Id = dto.Id,
                    PensamentoDoAutor = dto.PensamentoDoAutor,
                    NomeAutor = dto.NomeAutor,
                    Modelo = dto.Modelo
                };

                var resultado = await _service.AtualizarAsync(pensamento);

                if (!resultado)
                    return NotFound();

                return Ok(pensamento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        /*
        [HttpPut("{id}")]
        public async Task<ActionResult> Atualizar([FromBody] PensamentoAtualizacaoDto dto)
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
                    return NotFound(new { error = "Pensamento não encontrado" });

                return Ok(pensamento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }*/

        [HttpDelete("{id}")]
        public async Task<ActionResult> Excluir(int id)
        {
            try
            {
                var resultado = await _service.ExcluirAsync(id);
                if (!resultado)
                    return NotFound(new { error = "Pensamento não encontrado" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
