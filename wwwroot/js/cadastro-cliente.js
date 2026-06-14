document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const clienteId = params.get('codigo');
    const modo = params.get('modo') || 'criar';

    const tituloPagina = document.getElementById('tituloPagina');
    const formCliente = document.getElementById('formCliente');

    if (clienteId) {
        if (modo === 'visualizar') {
            tituloPagina.textContent = 'Visualizar Cliente';
            desabilitarFormulario();
        } else if (modo === 'editar') {
            tituloPagina.textContent = 'Editar Cliente';
        }
        await carregarCliente(clienteId);
    } else {
        tituloPagina.textContent = 'Cadastrar Novo Cliente';
    }

    aplicarMascaraDocumento();

    formCliente.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (modo === 'visualizar') {
            alert('Modo visualização - não é possível salvar');
            return;
        }
        await salvarCliente(clienteId);
    });
});

async function carregarCliente(codigo) {
    try {
        const clienteId = parseInt(codigo);

        const resposta = await fetch(`/api/cliente/${clienteId}`);
        if (!resposta.ok) throw new Error('Cliente não encontrado');

        const cliente = await resposta.json();

        document.getElementById('nome').value = cliente.nome || '';
        document.getElementById('fantasia').value = cliente.fantasia || '';

        if (cliente.documento) {
            const docLimpo = cliente.documento.replace(/\D/g, '');
            document.getElementById('documento').value = formatarDocumento(docLimpo);
        }

        document.getElementById('rua').value = cliente.rua || '';
        document.getElementById('numero').value = cliente.numero || '';
        document.getElementById('bairro').value = cliente.bairro || '';
        document.getElementById('cidade').value = cliente.cidade || '';

    } catch (erro) {
        alert('Erro ao carregar cliente: ' + erro.message);
        window.location.href = 'clientes.html';
    }
}

function formatarDocumento(documento) {
    const docLimpo = documento.replace(/\D/g, '');

    if (docLimpo.length === 11) {
        // CPF: 000.000.000-00
        return docLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (docLimpo.length === 14) {
        // CNPJ: 00.000.000/0000-00
        return docLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return documento;
}

async function salvarCliente(codigo) {
    const cliente = {
        nome: document.getElementById('nome').value.trim(),
        fantasia: document.getElementById('fantasia').value.trim(),
        documento: document.getElementById('documento').value.replace(/\D/g, ''),
        rua: document.getElementById('rua').value.trim(),
        numero: document.getElementById('numero').value.trim(),
        bairro: document.getElementById('bairro').value.trim(),
        cidade: document.getElementById('cidade').value.trim()
    };

    try {
        let resposta;
        if (codigo) {
            resposta = await fetch(`/api/cliente/${codigo}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cliente)
            });
        } else {
            resposta = await fetch('/api/cliente', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cliente)
            });
        }

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.mensagem || 'Erro ao salvar cliente');
        }

        alert('Cliente salvo com sucesso!');
        window.location.href = 'clientes.html';

    } catch (erro) {
        alert('Erro: ' + erro.message);
    }
}

function aplicarMascaraDocumento() {
    const inputDoc = document.getElementById('documento');

    inputDoc.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, ''); 

        if (valor.length <= 11) {
            // Máscara de CPF: 000.000.000-00
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else {
            // Máscara de CNPJ: 00.000.000/0000-00
            valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
            valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
            valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
        }

        e.target.value = valor;
    });
}

function desabilitarFormulario() {
    const inputs = document.querySelectorAll('#formCliente input');
    inputs.forEach(input => input.disabled = true);
    const btnSalvar = document.querySelector('#formCliente button[type="submit"]');
    if (btnSalvar) btnSalvar.style.display = 'none';
}