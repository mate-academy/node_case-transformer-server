'use strict';

const sendResponse = (res, response, statusCode, data) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.statusText = response;

  res.end(data);
};

module.exports.sendResponse = sendResponse;
