function sendResponce(statusCode, body, res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  return res.end(JSON.stringify(body));
}

module.exports = sendResponce;
