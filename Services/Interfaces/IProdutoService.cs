using testesoftline.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace testesoftline.Services.Interfaces
{
    public interface IProdutoService
    {
        Task<IEnumerable<Produto>> ObterTodosAsync();
        Task<Produto?> ObterPorCodigoAsync(int codigo);
        Task<Produto> AdicionarAsync(Produto produto);
        Task<Produto?> AtualizarAsync(int codigo, Produto produto);
        Task<bool> DeletarAsync(int codigo);

    }
}
