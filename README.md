# trello-api-tests
Cenários de testes da API do Trello e Testes automatizados de Criação e autenticação utilizando Cypress e Javascript.
As funcionalidades que foram automatizadas foram as seguintes:
- Autenticação*;
- Criação de cards.


# Requisitos
 - Node, recomenda-se versão superior a 12.
 - Npx ou Cypress instalado.


# Iniciando o Projeto

- Crie o seu arquivo .env na raíz do projeto seguindo o .env.exemplo
- Na raíz do projeto execute `npm i`
- Em seguida para abrir o Cypress Runner execute o comando `npx cypress open`
- Se preferir executar os testes direto pelo terminal, execute `npx cypress run`

# Rodando com Docker


- Crie o seu arquivo .env na raíz do projeto seguindo o .env.exemplo
- Na raíz do projeto, excute `docker-compose build`
- Ainda na raíz, execute `docker-compose up` e os testes serão executados

Ao utilizar a versão com o docker, o Cypress Runner não está disponível.