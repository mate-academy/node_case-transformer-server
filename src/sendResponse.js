const sendResponse = (res, response, statusCode, data ) => {
  res.setHeader('Content-type', 'application/json');
  res.statusCode = statusCode;
  res.statusText = response;

  res.end(JSON.stringify(data));
};

module.exports = { sendResponse }
