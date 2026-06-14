using Microsoft.EntityFrameworkCore;
using testesoftline.Data;
using testesoftline.Models;
using testesoftline.Services.Interfaces;

namespace SeuProjeto.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly AppDbContext _context;

        public UsuarioService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Usuario?> ValidarLoginAsync(string nome, string senha)
        {
            var usuarioEncontrado = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Nome == nome && u.Senha == senha);

            return usuarioEncontrado;
        }

        public async Task<bool> ExisteAlgumUsuarioAsyns()
        {
            return await _context.Usuarios.AnyAsync();
        }

        public async Task<Usuario> CriarPrimeiroUsuarioAsync(Usuario usuario)
        {
            if (await ExisteAlgumUsuarioAsyns())
            {
                throw new InvalidOperationException("Já existe um usuário cadastrado. Não é possível criar outro.");
            }

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<Usuario?> ObterPorIdAsync(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }

        public async Task<bool> ExisteAlgumUsuarioAsync()
        {
            return await _context.Usuarios.AnyAsync();
        }
    }
}