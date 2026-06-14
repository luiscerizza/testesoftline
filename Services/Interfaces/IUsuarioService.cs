using testesoftline.Models;

namespace testesoftline.Services.Interfaces
{
    public interface IUsuarioService
    {
        Task<Usuario?> ValidarLoginAsync(string nome, string senha);

        Task<bool> ExisteAlgumUsuarioAsync();

        Task<Usuario> CriarPrimeiroUsuarioAsync(Usuario usuario);

        Task<Usuario?> ObterPorIdAsync(int id);
    }
}
