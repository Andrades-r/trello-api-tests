const INFORMATIVE = {
  continue: 100,
  switchingProtocol: 101,
  processing: 102,
};

const SUCCESS = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
};

const CLIENT_ERRO = {
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  unprocessableEntity: 422,
};

const SERVER_ERRO = {
  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 503,
};

export default {
  INFORMATIVE,
  SUCCESS,
  SERVER_ERRO,
  CLIENT_ERRO,
};
