using Microsoft.AspNetCore.Mvc;
using testesoftline.Models;
using testesoftline.Services.Interfaces;

namespace testesoftline.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClienteController : ControllerBase
    {
        private readonly IClienteService _clienteService;

        public ClienteController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpGet]
        public async Task<IActionResult> ObterTodos()
        {
            var clientes = await _clienteService.ObterTodosAsync();
            return Ok(clientes);
        }

        [HttpGet("{codigo}")]
        public async Task<IActionResult> ObterPorCodigo(int codigo)
        {
            var cliente = await _clienteService.ObterPorCodigoAsync(codigo);
            if (cliente == null)
                return NotFound(new { mensagem = "Cliente não encontrado." });
            return Ok(cliente);
        }

        [HttpPost]
        public async Task<IActionResult> Adicionar([FromBody] Cliente cliente)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var novoCliente = await _clienteService.AdicionarAsync(cliente);
                return CreatedAtAction(nameof(ObterPorCodigo), new { codigo = novoCliente.Codigo }, novoCliente);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpPut("{codigo}")]
        public async Task<IActionResult> Atualizar(int codigo, [FromBody] Cliente cliente)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var clienteAtualizado = await _clienteService.AtualizarAsync(codigo, cliente);
            if (clienteAtualizado == null)
                return NotFound(new { mensagem = "Cliente não encontrado para atualização." });

            return Ok(clienteAtualizado);
        }

        [HttpDelete("{codigo}")]
        public async Task<IActionResult> Deletar(int codigo)
        {
            var sucesso = await _clienteService.DeletarAsync(codigo);
            if (!sucesso)
                return NotFound(new { mensagem = "Cliente não encontrado para exclusão." });

            return NoContent();
        }
    }
}
