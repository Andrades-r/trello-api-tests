# trello-api-tests

Cenários de testes da API do Trello estão no arquivo CenariosTestes.pdf na raíz do projeto.
Foram implementados Testes automatizados utilizando Cypress e Javascript.
As funcionalidades que foram automatizadas foram as seguintes:
- Autenticação;
- Criação de cards.


# Requisitos para execução dos testes Automatizados
 - Node, recomenda-se versão superior a 12.
 - Npx ou Cypress instalado.


# Iniciando o Projeto

- Crie o seu arquivo .env na raíz do projeto seguindo o .env.exemplo
- Na raíz do projeto execute `npm i`
- Em seguida para abrir o Cypress Runner execute o comando `npx cypress open` ou `npm run cypress:open`
- Se preferir executar os testes direto pelo terminal, execute `npx cypress run` ou `npm run cypress:run`.

# Rodando com Docker


- Crie o seu arquivo .env na raíz do projeto seguindo o .env.exemplo
- Na raíz do projeto, excute `docker-compose build`
- Ainda na raíz, execute `docker-compose up` e os testes serão executados no terminal.

Ao utilizar a versão com o docker, o Cypress Runner não está disponível.
Docker configurado para utilizar a porta 1005, caso esteja em uso mudar no arquivo docker-compose.yml.