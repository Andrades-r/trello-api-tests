import { INVALID_KEY, INVALID_TOKEN } from '../../const/messages';
import { SUCCESS, CLIENT_ERRO } from '../../../status/statusCode';
import { URL_MEMBER } from '../../const/urls';

const USER_ID = Cypress.env('USER_ID');

function generateUrl(apiKey, apiToken) {
  return `${URL_MEMBER}/me/boards?key=${apiKey}&token=${apiToken}`;
}

function validateFailedResponse(response, expectedStatusCode, expectedMessage) {
  expect(response.status).to.be.eq(expectedStatusCode);
  expect(response.body).to.be.eq(expectedMessage);
}

describe('Retrieve user Data to validate apiToken and apiKey', () => {
  before(() => {

  });

  it('Get user data successfully', () => {
    const urlUserData = generateUrl(Cypress.env('API_KEY'), Cypress.env('API_TOKEN'));
    cy.getRequest(urlUserData).then((response) => {
      expect(response.status).to.be.eq(SUCCESS.ok);
      expect(response.body[0].id).to.be.eq(USER_ID);
    });
  });

  it('Failed to get user data - Invalid Key', () => {
    const urlUserData = generateUrl('sdajsa123bf21', Cypress.env('API_TOKEN'));
    cy.getRequest(urlUserData).then((response) => {
      validateFailedResponse(response, CLIENT_ERRO.unauthorized, INVALID_KEY);
    });
  });

  it('Failed to get user data - Invalid Token', () => {
    const urlUserData = generateUrl(Cypress.env('API_KEY'), 'idn14n9padg');
    cy.getRequest(urlUserData).then((response) => {
      validateFailedResponse(response, CLIENT_ERRO.unauthorized, INVALID_TOKEN);
    });
  });

  it('Failed to get user data - Invalid Token and Key', () => {
    const urlUserData = generateUrl('sdajsa123bf21', 'idn14n9padg');
    cy.getRequest(urlUserData).then((response) => {
      validateFailedResponse(response, CLIENT_ERRO.unauthorized, INVALID_KEY);
    });
  });

  it('Failed to get user data - Blank Key', () => {
    const urlUserData = generateUrl('', Cypress.env('API_TOKEN'));
    cy.getRequest(urlUserData).then((response) => {
      validateFailedResponse(response, CLIENT_ERRO.badRequest, INVALID_TOKEN);
    });
  });

  it('Failed to get user data - Blank Token', () => {
    const urlUserData = generateUrl(Cypress.env('API_KEY'), '');
    cy.getRequest(urlUserData).then((response) => {
      validateFailedResponse(response, CLIENT_ERRO.badRequest, INVALID_TOKEN);
    });
  });

  it('Failed to get user data - Blank Token and Key', () => {
    const urlUserData = generateUrl('', '');
    cy.getRequest(urlUserData).then((response) => {
      validateFailedResponse(response, CLIENT_ERRO.badRequest, INVALID_TOKEN);
    });
  });
});
