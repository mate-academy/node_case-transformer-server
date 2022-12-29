const sendResponse = (res, data, statusCode) => {
  if (statusCode === 400) {
    res.statusCode = 400;
    res.statusMessage = 'Bad request';
  }

  res.end(JSON.stringify(data));
};

module.exports = { sendResponse };
