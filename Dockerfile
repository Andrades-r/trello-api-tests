FROM cypress/browsers:node16.14.2-slim-chrome100-ff99-edge

RUN mkdir /teste-trello

WORKDIR /teste-trello

COPY ./package.json ./

COPY ./cypress.json ./

COPY ./cypress ./cypress


RUN npm install

ENTRYPOINT ["npx", "cypress" , "run"]

CMD [""]

