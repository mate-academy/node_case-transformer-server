
const sendResponse = (res, responseStatus, body) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = responseStatus;
  res.write(JSON.stringify(body));
  res.end();
};

module.exports = {
  sendResponse,
};
