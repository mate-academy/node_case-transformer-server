'use strict';

const sendSuccessResponse = (res, body) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.end(body);
};

module.exports = {
  sendSuccessResponse,
};
