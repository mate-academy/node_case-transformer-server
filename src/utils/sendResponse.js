'use strict';

const sendResponse = (res, resCode, resMessage, body) => {
  res.statusCode = resCode;
  res.statusMessage = resMessage;
  res.end(body);
};

module.exports = {
  sendResponse,
};
