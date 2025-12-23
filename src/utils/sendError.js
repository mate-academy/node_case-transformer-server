const sendError = (res, statusCode, messages) => {
  res.statusCode = statusCode;
  res.statusMessage = 'Bad request';
  res.setHeader('Content-Type', 'application/json');

  res.end(JSON.stringify({ errors: messages }));
};

module.exports = { sendError };
