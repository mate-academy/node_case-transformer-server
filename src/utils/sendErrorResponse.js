function sendErrorResponse(res, statusCode, messages) {
  res.statusCode = statusCode;
  res.setHeader('Content-type', 'application/json');

  res.end(
    JSON.stringify({
      errors: messages.map((message) => ({ message })),
    }),
  );
}

module.exports = { sendErrorResponse };
