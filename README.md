# API para estudo de conceitos backend

Este projeto é uma API RESTful de vendas desenvolvida com o propósito principal de servir como uma plataforma de estudo para conceitos avançados de desenvolvimento backend. O foco está em explorar e implementar várias tecnologias e práticas essenciais para a construção de sistemas robustos e escaláveis.

## Objetivo Educacional

O projeto foi criado para o estudo aprofundado dos seguintes conceitos e tecnologias:

- Caching com Redis para otimização de performance
- Mensageria para comunicação assíncrona entre serviços
- Autenticação e autorização usando JWT (JSON Web Tokens)
- ORM (Object-Relational Mapping) com TypeORM
- Banco de dados relacional (PostgreSQL) e NoSQL (Redis)
- Containerização com Docker
- Arquitetura de microserviços
- Tratamento de erros e logging
- Validação de dados com Celebrate (baseado no Joi)
- Envio de e-mails transacionais
- Upload e gerenciamento de arquivos
- Testes unitários e de integração
- CI/CD (Integração Contínua e Entrega Contínua)

Através da implementação destes conceitos, o projeto visa proporcionar uma experiência prática e abrangente no desenvolvimento de APIs modernas e escaláveis.
## Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- TypeORM
- PostgreSQL
- Redis
- Docker
- JWT para autenticação
- Nodemailer para envio de e-mails
- Celebrate para validação de dados
- Multer para upload de arquivos

## Pré-requisitos

- Node.js (versão recomendada: 14.x ou superior)
- Docker e Docker Compose
- npm ou yarn

## Configuração e Execução

1. Clone o repositório:
git clone https://github.com/Mariano-SI/Backend-Advanced-Concepts-Studies.git cd Backend-Advanced-Concepts-Studies


2. Instale as dependências:
`npm install`


3. Inicie os serviços do Docker (PostgreSQL e Redis):
`docker compose up -d`


4. Execute as migrações do banco de dados:
`npm run typeorm migration:run`


5. Inicie o servidor de desenvolvimento:
npm run dev


O servidor estará rodando em `http://localhost:3000` (ou na porta definida no arquivo de configuração).

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com hot-reload.
- `npm run lint`: Executa o linter para verificar o código.
- `npm run typeorm`: Executa comandos do TypeORM CLI.

## Estrutura do Projeto

O projeto segue uma arquitetura modular, com separação clara de responsabilidades:

- `src/`: Contém o código-fonte da aplicação.
- `config/`: Configurações da aplicação.
- `modules/`: Módulos da aplicação (usuários, produtos, pedidos, etc.).
- `shared/`: Código compartilhado entre os módulos.
 - `http/`: Configuração do servidor Express.
 - `typeorm/`: Configurações e migrações do TypeORM.
- `utils/`: Funções utilitárias.

## Funcionalidades

- Autenticação de usuários com JWT
- CRUD de produtos
- Gerenciamento de pedidos
- Cache com Redis para otimização de performance
- Envio de e-mails transacionais
- Upload de arquivos
