const createErrorResponse = (response, statusCode, errors) => {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ errors }));
};

module.exports = { createErrorResponse };
