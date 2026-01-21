const sendJSONResponse = (res, code, content, message) => {
  res.statusCode = code;

  if (message) {
    res.statusMessage = message;
  }

  res.setHeader('Content-Type', 'application/json');

  res.end(JSON.stringify(content));
};

module.exports = { sendJSONResponse };
