const sendError = (response, statusCode, errorMessages) => {
  const errors = [];

  errorMessages.forEach(error => {
    errors.push({ message: error });
  });
  response.statusCode = statusCode;
  response.end(JSON.stringify({ errors }));
};

module.exports = sendError;
