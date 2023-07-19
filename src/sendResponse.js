const sendResponse = (response, statusCode, data) => {
  response.setHeader('Content-Type', 'application/json');
  response.statusCode = statusCode;

  return response.end(JSON.stringify(data));
};

module.exports = { sendResponse };
