# Funcionalidades Macros

# Recuperação de senha
*** Requisitos Funcionais ***

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resertar a sia senha;

*** Requisitos não funcionais ***
- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

*** Regras de negócios ***

- link enviado por email para resertar senha, deve expirar em 2h;
- O usuário precisar confirmar a nova senha para resetar a atual.

# Atualização de perfil

*** Requisitos Funcionais ***

- O usuário deve poder atualizar seu nome, email e senha.

*** Regras de negócios ***
- O usuário não pode alterar seu email para um já utilizado;
- Para atualizar sua senha, o usuário deve informar a antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha.


# Painel do prestador

*** Requisitos Funcionais ***
- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

*** Requisitos não funcionais ***

- Os agendamentos do prestador no dia deve ser amarzenado em cache;
- As notificações do prestador devem ser amarzenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

*** Regras de negócios ***

- A notificação deve ter um status de lida ou não lida, para que o prestador possa controlar.

# Agendamento de serviços

*** Requisitos Funcionais ***

- O usuário deve poder listar todos prestadores de serviço cadastrado;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponiveis em um dia específicode de um prestador;
- O usuário deve poder realizar um novo agendamento com o prestador;

*** Requisitos não funcionais ***
- A listagem de prestadores deve ser amarzenada em cache;

*** Regras de negócios ***

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponiveis entre 8h ás 18h (Primeiro ás 8h, último ás 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo.


