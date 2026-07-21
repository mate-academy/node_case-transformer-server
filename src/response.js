function sendJson(res, statusCode, body) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;

  res.end(JSON.stringify(body));
}

function sendSuccess(res, body) {
  const statusCode = 200;

  sendJson(res, statusCode, body);
}

function sendError(res, errors) {
  const statusCode = 400;

  sendJson(res, statusCode, { errors });
}

module.exports = {
  sendSuccess,
  sendError,
};
