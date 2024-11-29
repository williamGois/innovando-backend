
# AdonisJS 6 Starter Guide with Docker and Node 20

## Introdução

Este guia descreve como configurar e executar um projeto **AdonisJS 6** com **Docker** e **Node.js 20**.

---

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js 20](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Configuração

### 1. Instalar Dependências do Node.js

Certifique-se de instalar as dependências do projeto antes de prosseguir:

```bash
npm install
```

---

### 2. Construir e Subir os Contêineres com Docker

Certifique-se de que o Docker está instalado e configurado corretamente. Execute os comandos abaixo:

```bash
docker-compose build
docker-compose up -d
```

---

### 3. Executar Migrações no Banco de Dados

Após os contêineres estarem rodando, execute as migrações para preparar o banco de dados:

```bash
node ace migration:run
```

---

### 4. Inserir Dados Iniciais no Banco de Dados (Seeders)

Insira os dados iniciais necessários para o funcionamento do sistema:

```bash
node ace db:seed --files="database/seeders/permission_seeder.ts"
node ace db:seed --files="database/seeders/client_seeder.ts"
node ace db:seed --files="database/seeders/user_seeder.ts"
```

---

### 5. Iniciar o Servidor de Desenvolvimento

Com o banco de dados configurado, inicie o servidor de desenvolvimento para começar a usar a aplicação:

```bash
node ace serve --watch
```

---

### 6. Verificar a Aplicação

Agora, acesse a aplicação no navegador para verificar se tudo está funcionando:

[http://localhost:3333](http://localhost:3333)

---

## Notas Importantes

- **Docker Compose:** O comando `docker-compose up -d` cria e inicia os contêineres no modo "detached", garantindo que eles continuem rodando em segundo plano.
- **Migrações e Seeders:** Estes comandos garantem que a estrutura e os dados básicos do banco de dados sejam configurados corretamente.
- **Reinstalação de Dependências:** Se houver alterações no `package.json`, execute `npm install` novamente.
- **Ambiente Docker:** Certifique-se de que os arquivos de configuração do Docker, como `docker-compose.yml`, estão configurados corretamente para seu ambiente.

---

Agora, sua aplicação AdonisJS está configurada e pronta para uso! 🚀
