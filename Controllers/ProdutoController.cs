using Microsoft.AspNetCore.Mvc;
using testesoftline.Models;
using testesoftline.Services.Interfaces;

namespace testesoftline.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoController : ControllerBase
    {
        private readonly IProdutoService _produtoService;

        public ProdutoController(IProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet]
        public async Task<IActionResult> ObterTodos()
        {
            var produtos = await _produtoService.ObterTodosAsync();
            return Ok(produtos);
        }

        [HttpGet("{codigo}")]
        public async Task<IActionResult> ObterPorCodigo(int codigo)
        {
            var produto = await _produtoService.ObterPorCodigoAsync(codigo);
            if (produto == null)
                return NotFound(new { mensagem = "Produto não encontrado." });

            return Ok(produto);
        }

        [HttpPost]
        public async Task<IActionResult> Adicionar([FromBody] Produto produto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var novoProduto = await _produtoService.AdicionarAsync(produto);
                return CreatedAtAction(nameof(ObterPorCodigo), new { codigo = novoProduto.Codigo }, novoProduto);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpPut("{codigo}")]
        public async Task<IActionResult> Atualizar(int codigo, [FromBody] Produto produto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var produtoAtualizado = await _produtoService.AtualizarAsync(codigo, produto);
                if (produtoAtualizado == null)
                    return NotFound(new { mensagem = "Produto não encontrado." });

                return Ok(produtoAtualizado);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpDelete("{codigo}")]
        public async Task<IActionResult> Deletar(int codigo)
        {
            var sucesso = await _produtoService.DeletarAsync(codigo);
            if (!sucesso)
                return NotFound(new { mensagem = "Produto não encontrado." });

            return NoContent();
        }
    }
}