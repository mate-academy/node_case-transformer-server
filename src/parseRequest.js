const { URL } = require('url');

function parseRequest(req) {
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const toCase = searchParams.get('toCase');
  const textToConvert = pathname.slice(1);

  return { toCase, textToConvert };
}

module.exports = parseRequest;
