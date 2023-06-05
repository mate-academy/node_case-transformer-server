function sendRequest(res, statusCode, responseData) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(responseData));
};

module.exports = { sendRequest };
