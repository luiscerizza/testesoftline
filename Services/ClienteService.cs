using Microsoft.EntityFrameworkCore;
using testesoftline.Data;
using testesoftline.Models;
using testesoftline.Services.Interfaces;
using testesoftline.Helpers;

namespace testesoftline.Services
{
    public class ClienteService : IClienteService
    {
        private readonly AppDbContext _context;

        public ClienteService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Models.Cliente>> ObterTodosAsync()
        {
            return await _context.Clientes.ToListAsync();
        }

        public async Task<Cliente?> ObterPorCodigoAsync(int codigo)
        {
            return await _context.Clientes.FindAsync(codigo);
        }
        public async Task<Cliente> AdicionarAsync(Cliente cliente)
        {
            ValidarDocumento(cliente.Documento);

            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
            return cliente;
        }

        public void ValidarDocumento(string documento)
        {
            var documentoLimpo = new string(documento.Where(char.IsDigit).ToArray());

            if (documentoLimpo.Length != 11 && documentoLimpo.Length != 14)
            {
                throw new ArgumentException("O documento deve conter 11 dígitos (CPF) ou 14 dígitos (CNPJ).");
            }

            if (documentoLimpo.Length == 11 && !DocumentoValidator.EhCpfValido(documentoLimpo))
            {
                throw new ArgumentException("O CPF informado é inválido.");
            }

            if (documentoLimpo.Length == 14 && !DocumentoValidator.EhCnpjValido(documentoLimpo))
            {
                throw new ArgumentException("O CNPJ informado é inválido.");
            }
        }

        public async Task<Cliente?> AtualizarAsync(int codigo, Cliente clienteAtualizado)
        {
            var clienteExistente = await _context.Clientes.FindAsync(codigo);
            if (clienteExistente == null) return null;
            ValidarDocumento(clienteAtualizado.Documento);

            clienteExistente.Nome = clienteAtualizado.Nome;
            clienteExistente.Fantasia = clienteAtualizado.Fantasia;
            clienteExistente.Documento = clienteAtualizado.Documento;
            clienteExistente.Rua = clienteAtualizado.Rua;
            clienteExistente.Numero = clienteAtualizado.Numero;
            clienteExistente.Bairro = clienteAtualizado.Bairro;
            clienteExistente.Cidade = clienteAtualizado.Cidade;
            await _context.SaveChangesAsync();
            return clienteExistente;
        }       

        public async Task<bool> DeletarAsync(int codigo)
        {
            var cliente = await _context.Clientes.FindAsync(codigo);
            if (cliente == null) return false;
            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
