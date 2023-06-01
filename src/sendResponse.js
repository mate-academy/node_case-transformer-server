const sendResponse = (
  res,
  responseBody,
  statusCode,
  statusText,
) => {
  res.setHeader = ('Content-Type', 'application/json');
  res.statusText = statusText;
  res.statusCode = statusCode;
  res.end(JSON.stringify(responseBody));
};

module.exports = { sendResponse };
