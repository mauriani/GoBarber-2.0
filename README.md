## 🚀 Sobre o projeto

API GoBarber, ela foi desenvolvida durante toda a jornada do GoStack 11 onde aprendemos diversos conceitos e tecnologias como AWS, DTO ( Padrão de projeto), NodeJs, Typeormetc. O projeto é para ***Barbeiros e Cabeleireiros,*** o nosso público consegue acessar a aplicação e ver os agendamentos que foram marcados, consegue se autenticar, criar cadastro etc.

Aplicações

- Aplicação Web
- Aplicação Mobile

## 💻Funcionalidades

Nossas funcionalidades foram divididas entre ***requisitos funcionais, não funcionais e regras de negócio***.

- ***Recuperação de senha***
    - *Requisitos Funcionais*

    ```tsx
    [x] O usuário deve poder recuperar sua senha informando o seu e-mail;
    [x] O usuário deve receber um e-mail com instruções de recuperação de senha;
    [x] O usuário deve poder resertar a sua senha;
    ```

    - *Requisitos não funcionais*

    ```tsx
    [x] Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
    [x] Utilizar Amazon SES para envios em produção;
    [x] O envio de e-mails deve acontecer em segundo plano (background job);
    ```

- *Regras de negócio*

```tsx
[x] link enviado por email para resertar senha, deve expirar em 2h;
[x] O usuário precisar confirmar a nova senha para resetar a atual;
[x] Identificar o usuário
```

- ***Atualização de perfil***
    - *Requisitos Funcionais*

    ```tsx
    [x] O usuário deve poder atualizar seu nome, email e senha.
    ```

    - *Regras de negócio*

    ```tsx
    [x] O usuário não pode alterar seu email para um já utilizado;
    [x] Para atualizar sua senha, o usuário deve informar a antiga;
    [x] Para atualizar sua senha, o usuário precisa confirmar a nova senha.
    ```

- ***Painel do prestador***
    - *Requisitos Funcionais*

    ```tsx
    [x] O usuário deve poder listar seus agendamentos de um dia específico;
    [x] O prestador deve receber uma notificação sempre que houver um novo agendamento;
    [x] O prestador deve poder visualizar as notificações não lidas;
    ```

    - *Requisitos não funcionais*

    ```tsx
    [x] Os agendamentos do prestador no dia deve ser amarzenado em cache;
    [x] As notificações do prestador devem ser amarzenadas no MongoDB;
    [x] As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;
    ```

    - *Regras de negócio*

    ```tsx
    [x] A notificação deve ter um status de lida ou não lida, para que o prestador possa controlar.
    ```

- ***Agendamento de serviços***
    - *Requisitos Funcionais*

    ```tsx
    [x] O usuário deve poder listar todos prestadores de serviço cadastrado;
    [x] O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
    [x] O usuário deve poder listar horários disponiveis em um dia específicode de um prestador;
    [x] O usuário deve poder realizar um novo agendamento com o prestador;
    ```

    - *Requisitos não funcionais*

    ```tsx
    [x] A listagem de prestadores deve ser amarzenada em cache;
    ```

    - *Regras de negócio*

    ```tsx
    [x] Cada agendamento deve durar 1h exatamente;
    [x] Os agendamentos devem estar disponiveis entre 8h ás 18h (Primeiro ás 8h, último ás 17h);
    [x] O usuário não pode agendar em um horário já ocupado;
    [x] O usuário não pode agendar em um horário que já passou;
    [x] O usuário não pode agendar serviços consigo mesmo.
    ```

## 🖥️ Ferramentas

- [Docker](https://www.notion.so/Instalando-Docker-6290d9994b0b4555a153576a1d97bee2)  ( Para Criação do nossos containers)
    - ***Criação do nosso Banco***

    ```tsx
    docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
    ```

    - ***Criação Banco MongoDb (Armazena as notificações do prestador)***

    ```tsx
    docker run --name mongodb -p 27017:27017 -d -t mongo
    ```

    - ***Criação do Redis - (Amarzena o nosso cache)***

    ```tsx
    docker run --name redis -p 6379:6379 -d -t redis:alpine
    ```

- [Insomnia](https://insomnia.rest/download) ( Para realizar teste na API)

### ✏️ Clonando Projeto

```
 # clonar o repositório
 $ https://github.com/mauriani/GoBarber-backend

 # acessar a pasta do projeto
 $ cd GoBarber-backend

 # instalar as dependências do projeto
 $ yarn or npm install

```

### Start na aplicação

Para executar o nosso projeto precisamos da start no nossos bancos. Feito isso só rodar o comando abaixo.

```tsx
# Start
 yarn dev:start
```
