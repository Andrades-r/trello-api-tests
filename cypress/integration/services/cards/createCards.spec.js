import { SUCCESS, CLIENT_ERRO } from '../../../status/statusCode';
import {
	INVALID_LIST,
	INVALID_KEY,
	INVALID_TOKEN,
	INVALID_DATE,
	INVALID_POSITION,
	INVALID_OBJECT_ID
} from '../../const/messages';
import { CARD_DATA } from './data/cardData';
import {URL_CARD, URL_LIST} from '../../const/urls';

const WRONG_TOKEN = '123123';
const WRONG_KEY = '123123';
const WRONG_LIST = '123123';

const ID_MEMBER = Cypress.env('USER_ID');
const TARGET_LIST = Cypress.env('CARD_LIST');

const BASIC_CARD = {
  idList: TARGET_LIST,
	key: Cypress.env('API_KEY'),
	token: Cypress.env('API_TOKEN')
};

function generateCardUrl(params = BASIC_CARD) {
	return `${URL_CARD}?&idList=${params.idList}&key=${params.key}&token=${params.token}`;
}

function validateFailedResponse(response, expectedStatusCode, expectedMessage) {
	expect(response.status).to.be.eq(expectedStatusCode);
	expect(response.body.message).to.be.eq(expectedMessage);
}

function clearCardList(idList) {
  const getListUrl = `${URL_LIST}/${idList}/cards?key=${BASIC_CARD.key}&token=${BASIC_CARD.token}`;
  cy.log("Clearing the card list before running tests");
  cy.getRequest(getListUrl).then(response=>{
    response.body.forEach(card =>{
      const cardUrl = `${URL_CARD}/${card.id}?key=${BASIC_CARD.key}&token=${BASIC_CARD.token}`;
      cy.deleteRequest(cardUrl);
    })
  });
  cy.getRequest(getListUrl).then(response=>{
   if(response.length !== undefined){
     expect(response.length).to.be.eq(0);
    }
  });
}

describe('Create a Card', () => {
  before(() => {
    clearCardList(TARGET_LIST);
  });
  
	it('Create a blank card successfully', () => {
		cy.postRequest({}, generateCardUrl()).then((response) => {
			expect(response.status).to.be.eq(SUCCESS.ok);
		});
	});

	it('Create a card successfully', () => {
		cy.postRequest(CARD_DATA, generateCardUrl()).then((response) => {
			expect(response.status).to.be.eq(SUCCESS.ok);
		});
	});

	it('Create a card with due date successfully', () => {
		const CARD_VALID_DATA = { ...CARD_DATA, due: '2020-12-16', name: 'Card a DueDate' };
		cy.postRequest(CARD_VALID_DATA, generateCardUrl()).then((response) => {
			expect(response.status).to.be.eq(SUCCESS.ok);
		});
	});

	it('Create a card successfully dueCompleted', () => {
		const CARD_VALID_DATA = { ...CARD_DATA, dueComplete: true, name: 'Card with DueCompleted' };
		cy.postRequest(CARD_VALID_DATA, generateCardUrl()).then((response) => {
			expect(response.status).to.be.eq(SUCCESS.ok);
		});
	});

	it('Create a card successfully - Invalid dueCompleted', () => {
		const CARD_VALID_DATA = {
			...CARD_DATA,
			dueComplete: 'due not completed',
			name: 'Card without due'
		};
		cy.postRequest(CARD_VALID_DATA, generateCardUrl()).then((response) => {
			expect(response.status).to.be.eq(SUCCESS.ok);
		});
	});

	it('Create a card successfully with a Member', () => {
		const CARD_VALID_DATA = { ...CARD_DATA, idMembers: [ID_MEMBER], name: 'Card with a Member' };
		cy.postRequest(CARD_VALID_DATA, generateCardUrl()).then((response) => {
			expect(response.status).to.be.eq(SUCCESS.ok);
		});
	});

	it('Create a card successfully - idMember outside Group', () => {
		const CARD_VALID_DATA = {
			...CARD_DATA,
			idMembers: ['626d79f97f0620763077b9dc'],
			name: 'Card without a Member'
		};
		cy.postRequest(CARD_VALID_DATA, generateCardUrl()).then((response) => {
			expect(response.status).to.be.eq(SUCCESS.ok);
		});
	});

	it('Failed to create a card - Invalid idMember', () => {
		const CARD_VALID_DATA = { ...CARD_DATA, idMembers: [112233], name: 'Card with a Member' };
		cy.postRequest(CARD_VALID_DATA, generateCardUrl()).then((response) => {
			validateFailedResponse(response, CLIENT_ERRO.badRequest, INVALID_OBJECT_ID);
		});
	});


	it('Failed to create a card - Invalid Due Date, date does not exist', () => {
		const CARD_INVALID_DATE = { ...CARD_DATA, due: '2020-32-32' };
		cy.postRequest(CARD_INVALID_DATE, generateCardUrl()).then((response) => {
			validateFailedResponse(response, CLIENT_ERRO.badRequest, INVALID_DATE);
		});
	});

	it('Failed to create a card - Invalid Due Date Format', () => {
		const CARD_INVALID_DATE = { ...CARD_DATA, due: 'due date' };
		cy.postRequest(CARD_INVALID_DATE, generateCardUrl()).then((response) => {
			validateFailedResponse(response, CLIENT_ERRO.badRequest, INVALID_DATE);
		});
	});

	it('Failed to create a card - Invalid position', () => {
		const CARD_INVALID_POSITION = { pos: 'Invalid Position' };
		cy.postRequest(CARD_INVALID_POSITION, generateCardUrl()).then((response) => {
			validateFailedResponse(response, CLIENT_ERRO.badRequest, INVALID_POSITION);
		});
	});

	it('Failed to create a card - Blank idList', () => {
		const CARD_INVALID_LIST = { ...BASIC_CARD, idList: '' };
		const URL_CREATE_CARD = generateCardUrl(CARD_INVALID_LIST);
		cy.postRequest({}, URL_CREATE_CARD).then((response) => {
			expect(response.status).to.be.eq(CLIENT_ERRO.badRequest);
			expect(response.body).to.be.eq(INVALID_LIST);
		});
	});

	it('Failed to create a card - Invalid idList', () => {
		const CARD_INVALID_LIST = { ...BASIC_CARD, idList: WRONG_LIST };
		const URL_CREATE_CARD = generateCardUrl(CARD_INVALID_LIST);
		cy.postRequest({}, URL_CREATE_CARD).then((response) => {
			expect(response.status).to.be.eq(CLIENT_ERRO.badRequest);
			expect(response.body).to.be.eq(INVALID_LIST);
		});
	});

	it('Failed to create a card - Invalid apiKey', () => {
		const CARD_INVALID_KEY = { ...BASIC_CARD, key: WRONG_KEY };
		const URL_CREATE_CARD = generateCardUrl(CARD_INVALID_KEY);
		cy.postRequest({}, URL_CREATE_CARD).then((response) => {
			expect(response.status).to.be.equal(CLIENT_ERRO.unauthorized);
			expect(response.body).to.be.eq(INVALID_KEY);
		});
	});

	it('Failed to create a card - Invalid apiToken', () => {
		const CARD_INVALID_TOKEN = { ...BASIC_CARD, token: WRONG_TOKEN };
		const URL_CREATE_CARD = generateCardUrl(CARD_INVALID_TOKEN);
		cy.postRequest({}, URL_CREATE_CARD).then((response) => {
			expect(response.status).to.be.equal(CLIENT_ERRO.unauthorized);
			expect(response.body).to.be.eq(INVALID_TOKEN);
		});
	});
});
