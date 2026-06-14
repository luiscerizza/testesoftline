using Microsoft.AspNetCore.Mvc;
using testesoftline.Models;
using testesoftline.Services.Interfaces;

namespace testesoftline.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Nome) || string.IsNullOrWhiteSpace(request.Senha))
            {
                return BadRequest(new { mensagem = "Usuário e senha são obrigatórios." });
            }

            var usuarioValido = await _usuarioService.ValidarLoginAsync(request.Nome, request.Senha);

            if (usuarioValido == null)
            {
                return Unauthorized(new { mensagem = "Usuário ou senha inválidos." });
            }

            return Ok(new { mensagem = "Login realizado com sucesso!", usuario = usuarioValido.Nome });
        }

        [HttpGet("verificar-primeiro-acesso")]
        public async Task<IActionResult> VerificarPrimeiroAcesso()
        {
            var existe = await _usuarioService.ExisteAlgumUsuarioAsync();
            return Ok(existe);
        }

        [HttpPost]
        public async Task<IActionResult> CriarUsuario([FromBody] Usuario usuario)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var novoUsuario = await _usuarioService.CriarPrimeiroUsuarioAsync(usuario);
                return CreatedAtAction(nameof(ObterPorId), new { id = novoUsuario.Id }, novoUsuario);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPorId(int id)
        {
            var usuario = await _usuarioService.ObterPorIdAsync(id);
            if (usuario == null)
                return NotFound(new { mensagem = "Usuário não encontrado." });

            return Ok(usuario);
        }
    }

    public class LoginRequest
    {
        public string Nome { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
    }
}