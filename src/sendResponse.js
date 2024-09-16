function sendResponse(res, statusCode, statusMessage, data) {
  res.statusCode = 400;
  res.statusMessage = 'Bad request';
  res.end(JSON.stringify(data));
};

module.exports = { sendResponse };
