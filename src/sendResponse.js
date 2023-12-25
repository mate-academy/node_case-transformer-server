const sendResponse = (response, message, statusCode, data) => {
  response.setHeader('Content-Type', 'application/json');
  response.statusCode = statusCode;
  response.statusText = message;

  response.end(data);
};

module.exports = { sendResponse };
