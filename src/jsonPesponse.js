const createJsonResponse = (response, statusCode, responseBody) => {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(responseBody, null, 2));
};

module.exports = { createJsonResponse };
