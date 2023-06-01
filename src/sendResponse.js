'use strict';

function sendResponse(response, statusCode, body) {
  response.statusCode = statusCode;
  response.end(JSON.stringify(body));
}

module.exports.sendResponse = sendResponse;
