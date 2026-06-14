document.addEventListener('DOMContentLoaded', async () => {
    await carregarClientes();
});

async function carregarClientes() {
    const corpoTabela = document.getElementById('corpoTabela');

    try {
        const resposta = await fetch('/api/cliente');
        if (!resposta.ok) throw new Error('Erro ao carregar clientes');

        const clientes = await resposta.json();

        if (clientes.length === 0) {
            corpoTabela.innerHTML = '<tr><td colspan="6" class="tabela-vazia">Nenhum cliente cadastrado.</td></tr>';
            return;
        }

        corpoTabela.innerHTML = '';

        clientes.forEach(cliente => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${cliente.codigo}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.fantasia || '-'}</td>
                <td>${formatarDocumentoTabela(cliente.documento)}</td>
                <td>${cliente.cidade}</td>
                <td>
                    <button class="btn-acao btn-visualizar" onclick="visualizarCliente(${cliente.codigo})">Visualizar</button>
                    <button class="btn-acao btn-editar" onclick="editarCliente(${cliente.codigo})">Editar</button>
                    <button class="btn-acao btn-deletar" onclick="deletarCliente(${cliente.codigo})">Deletar</button>
                </td>
            `;
            corpoTabela.appendChild(linha);
        });

    } catch (erro) {
        corpoTabela.innerHTML = `<tr><td colspan="6" class="tabela-vazia" style="color: red;">${erro.message}</td></tr>`;
    }
}

function formatarDocumentoTabela(documento) {
    if (!documento) return '-';
    const docLimpo = documento.replace(/\D/g, '');

    if (docLimpo.length === 11) {
        return docLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (docLimpo.length === 14) {
        return docLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return documento;
}

function visualizarCliente(codigo) {
    window.location.href = `cadastro-cliente.html?codigo=${codigo}&modo=visualizar`;
}

function editarCliente(codigo) {
    window.location.href = `cadastro-cliente.html?codigo=${codigo}&modo=editar`;
}

async function deletarCliente(codigo) {
    if (!confirm('Tem certeza que deseja deletar este cliente?')) return;

    try {
        const resposta = await fetch(`/api/cliente/${codigo}`, { method: 'DELETE' });
        if (!resposta.ok) throw new Error('Erro ao deletar cliente');

        alert('Cliente deletado com sucesso!');
        carregarClientes();
    } catch (erro) {
        alert('Erro: ' + erro.message);
    }
}