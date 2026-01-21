const serverResponse = (response, statusCode, body) => {
  response.statusCode = statusCode;
  response.end(JSON.stringify(body));
};

module.exports = { serverResponse };
