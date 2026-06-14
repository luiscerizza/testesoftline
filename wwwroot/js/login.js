document.addEventListener('DOMContentLoaded', async () => {
   try {
        const resposta = await fetch('/api/usuario/verificar-primeiro-acesso');

        if (!resposta.ok) {
            console.error(" Erro na API de verificação. Status:", resposta.status);
        } else {
            const textoResposta = await resposta.text(); 
            const jaExisteUsuario = textoResposta.trim().toLowerCase() === 'true';

            console.log(" Resposta da API:", jaExisteUsuario);

            if (!jaExisteUsuario) {
                console.log(" Redirecionando para primeiro acesso...");
                window.location.href = 'primeiro-acesso.html';
                return;
            }
        }
    } catch (erro) {
        console.error(" Erro fatal ao verificar primeiro acesso:", erro);
    }
    const loginForm = document.getElementById('loginForm');
    const mensagemErro = document.getElementById('mensagemErro');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        mensagemErro.style.display = 'none';
        mensagemErro.textContent = '';

        const nomeInput = document.getElementById('usuario').value.trim();
        const senha = document.getElementById('senha').value.trim();

        if (!nomeInput || !senha) {
            mostrarErro('Por favor, preencha todos os campos.');
            return;
        }

        const dadosLogin = {
            nome: nomeInput, 
            senha: senha
        };

        try {
            const resposta = await fetch('/api/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosLogin)
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.mensagem || 'Erro ao fazer login.');
            }

            alert(dados.mensagem);
            window.location.href = 'menu.html';

        } catch (erro) {
            mostrarErro(erro.message);
        }
    });

    function mostrarErro(texto) {
        mensagemErro.textContent = texto;
        mensagemErro.style.display = 'block';
    }
});