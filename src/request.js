const URL = require('url');

function request(req) {
  const { path, searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const toCase = searchParams.get('toCase');
  const inputText = path.slice(1);

  return { toCase, inputText };
}

module.exports = request;
