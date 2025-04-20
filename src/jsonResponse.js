function jsonResponse(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'Node.js',
  });

  res.end(JSON.stringify(data));
}

module.exports = { jsonResponse };
