const sendResponse = (response, statusCode, data) => {
  response.statusCode = statusCode;
  response.end(JSON.stringify(data));
};

module.exports = sendResponse;
