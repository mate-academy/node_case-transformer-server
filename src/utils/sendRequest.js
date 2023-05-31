const sendRequest = (res, response, statusCode, data) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.statusText = response;

  res.end(JSON.stringify(data));
};

module.exports = { sendRequest };
