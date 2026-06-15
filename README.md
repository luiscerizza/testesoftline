# Sistema de Gestão - Desafio Técnico (.NET 8)

Este projeto é um sistema de gestão completo desenvolvido em **.NET 8**, com autenticação, cadastro de usuários e operações CRUD para clientes e produtos.

O frontend foi desenvolvido com **HTML, CSS e JavaScript puro**, seguindo um design minimalista, e se comunica com a API via requisições HTTP (fetch).

---

## 🎯 Funcionalidades

### 🔐 Autenticação e Usuários
- **Tela de Primeiro Acesso:** O sistema verifica automaticamente se é a primeira execução e redireciona para criação do usuário administrador.
- **Login:** Autenticação de usuários com validação no banco de dados.
- **Logout:** Opção de sair do sistema.

### 📦 Produtos 
- Listar todos os produtos cadastrados.
- Cadastrar novos produtos.
- Editar produtos existentes.
- Visualizar detalhes do produto (modo leitura).
- Deletar produtos.
- **Máscaras automáticas** para valores monetários (2 casas decimais) e peso (3 casas decimais).

### 👥 Clientes 
- Listar todos os clientes cadastrados.
- Cadastrar novos clientes.
- Editar clientes existentes.
- Visualizar detalhes do cliente (modo leitura).
- Deletar clientes.
- **Máscara inteligente de CPF/CNPJ** (alterna automaticamente conforme o usuário digita).
- **Validação matemática real** de CPF e CNPJ (algoritmo Módulo 11).

### 🗄️ Banco de Dados
- **Migrations:** Controle de versão do banco de dados gerenciado pelo Entity Framework Core.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **.NET 8** (C# 8.0)
- **ASP.NET Core Web API**
- **Entity Framework Core** (ORM)
- **MySQL** (Banco de dados)
- **Pomelo.EntityFrameworkCore.MySql** (Provedor MySQL)

### Frontend
- **HTML5** (Estrutura)
- **CSS3** (Estilização minimalista com variáveis CSS)
- **JavaScript ES6+** (Lógica, máscaras e comunicação com API via `fetch`)

---

## 📁 Estrutura de Pastas
```
├── Models/ # Entidades do domínio (Usuario, Produto, Cliente)
├── Data/ # Contexto do Entity Framework (AppDbContext)
├── Services/ # Camada de negócio e regras
│ ├── Interfaces/ # Contratos dos serviços
│ ├── UsuarioService.cs
│ ├── ProdutoService.cs
│ └── ClienteService.cs
├── Controllers/ # Endpoints da API REST
│ ├── UsuarioController.cs
│ ├── ProdutoController.cs
│ └── ClienteController.cs
├── Helpers/ # Classes utilitárias
│ └── DocumentoValidator.cs # Validação matemática de CPF/CNPJ
├── Migrations/ # Migrations do EF Core (geradas automaticamente)
├── wwwroot/ # Arquivos estáticos do Frontend
│ ├── css/
│ │ └── style.css # Tema branco e vermelho
│ ├── js/
│ │ ├── login.js
│ │ ├── primeiro-acesso.js
│ │ ├── produtos.js
│ │ ├── cadastro-produto.js
│ │ ├── clientes.js
│ │ └── cadastro-cliente.js
│ ├── login.html
│ ├── primeiro-acesso.html
│ ├── menu.html
│ ├── produtos.html
│ ├── cadastro-produto.html
│ ├── clientes.html
│ └── cadastro-cliente.html
├── appsettings.json # Strings de conexão e configurações
└── Program.cs # Configuração do pipeline e injeção de dependências
```

---

## 🚀 Como Executar

### Pré-requisitos
- **.NET 8 SDK** instalado
- **MySQL Server** instalado e rodando

### 1. Configurar a String de Conexão

Abra o arquivo `appsettings.json` e configure a conexão com seu banco MySQL:

```
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=softline;User=SEU_USUARIO;Password=SUA_SENHA;"
  }
}
```

2. Aplicar as Migrations
O banco de dados é gerenciado pelo Entity Framework Core. Para criar as tabelas automaticamente, execute no terminal (dentro da pasta do projeto):

```
dotnet ef database update
```

3. Executar a Aplicação
```
dotnet run
```

A aplicação estará disponível em:
Frontend: https://localhost:7242/login.html (a porta pode variar)

Swagger (API): https://localhost:7242/swagger



## 🔑 Primeiro Acesso

Antes de usar o sistema, é necessário criar o usuário administrador:

Acesse a URL inicial do sistema.

O sistema detectará que não há usuários e redirecionará automaticamente para a tela de Primeiro Acesso.

Preencha os dados do administrador (nome, senha e confirmação de senha).

Após a criação, você será redirecionado para a tela de Login.

Faça login com as credenciais criadas e acesse o menu principal.


👨‍💻 Autor

Desenvolvido por Luis Gustavo Cerizza como parte do desafio técnico.
