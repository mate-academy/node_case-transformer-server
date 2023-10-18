function sendBadRequest(res, messages) {
  const errorResponse = {
    errors: messages.map((message) => ({ message })),
  };

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(400, 'Bad Request');
  res.end(JSON.stringify(errorResponse));
}

module.exports = { sendBadRequest };
