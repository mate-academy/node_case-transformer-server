function sendErrorResponse(res, errors) {
  res.statusCode = 400;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ errors }));
}

module.exports = {
  sendErrorResponse,
};
