document.addEventListener('DOMContentLoaded', async () => {
    try {
        const resposta = await fetch('/api/usuario/verificar-primeiro-acesso');
        const jaExisteUsuario = await resposta.json();

        if (jaExisteUsuario) {
            window.location.href = 'login.html';
            return;
        }
    } catch (erro) {
        console.error("Erro ao verificar primeiro acesso:", erro);
    }

    const form = document.getElementById('formPrimeiroAcesso');
    const mensagemErro = document.getElementById('mensagemErro');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        mensagemErro.style.display = 'none';

        const nome = document.getElementById('nome').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const confirmarSenha = document.getElementById('confirmarSenha').value.trim();

        if (senha.length < 4) {
            mostrarErro('A senha deve ter pelo menos 4 caracteres.');
            return;
        }

        if (senha !== confirmarSenha) {
            mostrarErro('As senhas não coincidem.');
            return;
        }

        const dadosUsuario = {
            nome: nome,
            senha: senha
        };

        try {
            const resposta = await fetch('/api/usuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosUsuario)
            });

            if (!resposta.ok) {
                const erro = await resposta.json();
                throw new Error(erro.mensagem || 'Erro ao criar usuário.');
            }

            alert('Usuário administrador criado com sucesso! Faça o login.');
            window.location.href = 'login.html';

        } catch (erro) {
            mostrarErro(erro.message);
        }
    });

    function mostrarErro(texto) {
        mensagemErro.textContent = texto;
        mensagemErro.style.display = 'block';
    }
});