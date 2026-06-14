using Microsoft.EntityFrameworkCore;
using testesoftline.Data;
using testesoftline.Models;
using testesoftline.Services.Interfaces;

namespace testesoftline.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly AppDbContext _context;
        public ProdutoService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Produto> AdicionarAsync(Produto produto)
        {
            if (produto.ValorVenda.HasValue && produto.ValorVenda < 0)
            {
                throw new ArgumentException("O valor de venda não pode ser negativo.");
            }

            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
            return produto;
        }

        public async Task<Produto?> AtualizarAsync(int codigo, Produto produtoAtualizado)
        {
            var produtoExistente = await _context.Produtos.FindAsync(codigo);
            if (produtoExistente == null) return null;

            produtoExistente.Descricao = produtoAtualizado.Descricao;
            produtoExistente.CodigoBarras = produtoAtualizado.CodigoBarras;
            produtoExistente.ValorVenda = produtoAtualizado.ValorVenda;
            produtoExistente.PesoBruto = produtoAtualizado.PesoBruto;
            produtoExistente.PesoLiquido = produtoAtualizado.PesoLiquido;

            await _context.SaveChangesAsync();
            return produtoExistente;
        }

        public async Task<bool> DeletarAsync(int codigo)
        {
            var produto = await _context.Produtos.FindAsync(codigo);
            if (produto == null) return false;

            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Produto?> ObterPorCodigoAsync(int codigo)
        {
            return await _context.Produtos.FindAsync(codigo);
        }

        public async Task<IEnumerable<Produto>> ObterTodosAsync()
        {
            return await _context.Produtos.ToListAsync();
        }
    }
}
