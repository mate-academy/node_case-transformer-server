'use strict';

const sendErrorResponse = (res, body) => {
  res.statusCode = 400;
  res.statusMessage = 'Bad request';
  res.end(body);
};

module.exports = {
  sendErrorResponse,
};
