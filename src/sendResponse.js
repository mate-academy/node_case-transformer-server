const sendResponse = (response, statusCode, statusText, payload) => {
  response.setHeader('Content-type', 'application/json');
  response.statusCode = statusCode;
  response.statusMessage = statusText;
  response.end(JSON.stringify(payload));
};

module.exports = { sendResponse };
