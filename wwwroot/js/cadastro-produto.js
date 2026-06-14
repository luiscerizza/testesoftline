document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const produtoId = params.get('codigo');
    const modo = params.get('modo') || 'criar'; 

    const tituloPagina = document.getElementById('tituloPagina');
    const formProduto = document.getElementById('formProduto');

    if (produtoId) {
        if (modo === 'visualizar') {
            tituloPagina.textContent = 'Visualizar Produto';
            desabilitarFormulario();
        } else if (modo === 'editar') {
            tituloPagina.textContent = 'Editar Produto';
        }

        await carregarProduto(produtoId);
    } else {
        tituloPagina.textContent = 'Cadastrar Novo Produto';
    }

    aplicarMascaras();

    formProduto.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (modo === 'visualizar') {
            alert('Modo visualização - não é possível salvar');
            return;
        }

        await salvarProduto(produtoId);
    });
});

async function carregarProduto(codigo) {
    try {
        const produtoId = parseInt(codigo);
        const resposta = await fetch(`/api/produto/${produtoId}`);

        if (!resposta.ok) {
            throw new Error('Produto não encontrado');
        }

        const produto = await resposta.json(); 

        console.log('Produto carregado:', produto);

        document.getElementById('descricao').value = produto.descricao || '';
        document.getElementById('codigoBarras').value = produto.codigoBarras || '';

        if (produto.valorVenda !== null && produto.valorVenda !== undefined) {
            document.getElementById('valorVenda').value = formatarDecimal(produto.valorVenda, 2);
        }
        if (produto.pesoBruto !== null && produto.pesoBruto !== undefined) {
            document.getElementById('pesoBruto').value = formatarDecimal(produto.pesoBruto, 3);
        }
        if (produto.pesoLiquido !== null && produto.pesoLiquido !== undefined) {
            document.getElementById('pesoLiquido').value = formatarDecimal(produto.pesoLiquido, 3);
        }

    } catch (erro) {
        alert('Erro ao carregar produto: ' + erro.message);
        window.location.href = 'produtos.html';
    }
}

async function salvarProduto(codigo) {
    const produto = {
        descricao: document.getElementById('descricao').value.trim(),
        codigoBarras: document.getElementById('codigoBarras').value.trim(),
        valorVenda: converterParaDecimal(document.getElementById('valorVenda').value),
        pesoBruto: converterParaDecimal(document.getElementById('pesoBruto').value),
        pesoLiquido: converterParaDecimal(document.getElementById('pesoLiquido').value)
    };

    if (!produto.descricao) {
        alert('A descrição é obrigatória!');
        return;
    }

    try {
        let resposta;

        if (codigo) {
            resposta = await fetch(`/api/produto/${codigo}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produto)
            });
        } else {
            resposta = await fetch('/api/produto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produto)
            });
        }

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.mensagem || 'Erro ao salvar produto');
        }

        alert('Produto salvo com sucesso!');
        window.location.href = 'produtos.html';

    } catch (erro) {
        alert('Erro: ' + erro.message);
    }
}

function aplicarMascaras() {
    const camposDecimal2 = document.querySelectorAll('[data-mascara="decimal-2"]');
    const camposDecimal3 = document.querySelectorAll('[data-mascara="decimal-3"]');

    camposDecimal2.forEach(campo => {
        campo.addEventListener('input', (e) => {
            e.target.value = aplicarMascaraDecimal(e.target.value, 2);
        });
    });

    camposDecimal3.forEach(campo => {
        campo.addEventListener('input', (e) => {
            e.target.value = aplicarMascaraDecimal(e.target.value, 3);
        });
    });
}

function aplicarMascaraDecimal(valor, casasDecimais) {
    valor = valor.replace(/\D/g, '');

    if (valor === '') return '';

    if (casasDecimais === 2) {
        valor = (parseInt(valor) / 100).toFixed(2);
    } else if (casasDecimais === 3) {
        valor = (parseInt(valor) / 1000).toFixed(3);
    }

    const [parteInteira, parteDecimal] = valor.split('.');

    const parteInteiraFormatada = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return parteDecimal ? `${parteInteiraFormatada},${parteDecimal}` : parteInteiraFormatada;
}

function converterParaDecimal(valor) {
    if (!valor || valor.trim() === '') return null;

    const valorNumerico = valor.replace(/\./g, '').replace(',', '.');
    return parseFloat(valorNumerico);
}

function formatarDecimal(valor, casasDecimais) {
    return aplicarMascaraDecimal(valor.toFixed(casasDecimais).replace('.', ''), casasDecimais);
}

function desabilitarFormulario() {
    const inputs = document.querySelectorAll('#formProduto input');
    inputs.forEach(input => {
        input.disabled = true;
    });

    const btnSalvar = document.querySelector('#formProduto button[type="submit"]');
    if (btnSalvar) {
        btnSalvar.style.display = 'none';
    }
}