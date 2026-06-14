document.addEventListener('DOMContentLoaded', async () => {
    await carregarProdutos();
});

async function carregarProdutos() {
    const corpoTabela = document.getElementById('corpoTabela');

    try {
        const resposta = await fetch('/api/produto');

        if (!resposta.ok) {
            throw new Error('Erro ao carregar produtos');
        }

        const produtos = await resposta.json();

        if (produtos.length === 0) {
            corpoTabela.innerHTML = '<tr><td colspan="5" class="tabela-vazia">Nenhum produto cadastrado.</td></tr>';
            return;
        }

        corpoTabela.innerHTML = '';

        produtos.forEach(produto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.codigoBarras || '-'}</td>
                <td>R$ ${produto.valorVenda ? produto.valorVenda.toFixed(2) : '0.00'}</td>
                <td>
                    <button class="btn-acao btn-visualizar" onclick="visualizarProduto(${produto.codigo})">Visualizar</button>
                    <button class="btn-acao btn-editar" onclick="editarProduto(${produto.codigo})">Editar</button>
                    <button class="btn-acao btn-deletar" onclick="deletarProduto(${produto.codigo})">Deletar</button>
                </td>
            `;
            corpoTabela.appendChild(linha);
        });

    } catch (erro) {
        corpoTabela.innerHTML = `<tr><td colspan="5" class="tabela-vazia" style="color: red;">${erro.message}</td></tr>`;
    }
}

function visualizarProduto(codigo) {
    window.location.href = `cadastro-produto.html?codigo=${codigo}&modo=visualizar`;
}

function editarProduto(codigo) {
    window.location.href = `cadastro-produto.html?codigo=${codigo}&modo=editar`;
}

async function deletarProduto(codigo) {
    if (!confirm('Tem certeza que deseja deletar este produto?')) {
        return;
    }

    try {
        const resposta = await fetch(`/api/produto/${codigo}`, {
            method: 'DELETE'
        });

        if (!resposta.ok) {
            throw new Error('Erro ao deletar produto');
        }

        alert('Produto deletado com sucesso!');
        carregarProdutos(); 

    } catch (erro) {
        alert('Erro: ' + erro.message);
    }
}