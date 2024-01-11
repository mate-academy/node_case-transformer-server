function errorResponse(res, errorMessages, errorStatus = {}) {
  const {
    code = 400,
    message = 'Bad request',
  } = errorStatus;

  const errorsList = [];

  if (Array.isArray(errorMessages)) {
    errorsList.push(...errorMessages);
  } else {
    errorsList.push(errorMessages);
  }

  res.statusCode = code;
  res.statusMessage = message;

  res.end(JSON.stringify({
    errors: errorsList.map(errorMessage => ({
      message: errorMessage,
    })),
  }));
}

module.exports = {
  errorResponse,
};
