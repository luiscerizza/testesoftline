using testesoftline.Models;

namespace testesoftline.Services.Interfaces
{
    public interface IClienteService
    {
        Task<IEnumerable<Cliente>> ObterTodosAsync();
        Task<Cliente?> ObterPorCodigoAsync(int codigo);
        Task<Cliente> AdicionarAsync(Cliente cliente);
        Task<Cliente?> AtualizarAsync(int codigo, Cliente cliente);
        Task<bool> DeletarAsync(int codigo);
    }
}
