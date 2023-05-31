const sendError = (response, statusCode, errorMessages) => {
  response.statusCode = statusCode;
  response.end(JSON.stringify({ errors: errorMessages }));
};

module.exports = sendError;
