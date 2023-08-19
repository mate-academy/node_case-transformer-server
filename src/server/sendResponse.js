const sendResponse = (res, data, statusCode) => {
  res.setHeader('Content-type', 'application/json');

  res.statusCode = statusCode;

  res.end(JSON.stringify(data));
};

module.exports = {
  sendResponse,
};
