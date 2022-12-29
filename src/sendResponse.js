const sendResponse = (response, data, statusCode) => {
  if (statusCode === 400) {
    response.statusCode = 400;
    response.statusMessage = 'Bad request';
  }

  response.end(JSON.stringify(data));
};

module.exports = { sendResponse };
