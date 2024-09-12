const url = require('url');

function getParamsOfUrl(req) {
  const params = new url.URL(req.url, `http://${req.headers.host}`);
  const { pathname, searchParams } = params;

  const text = pathname.slice(1);
  const toCase = searchParams.get('toCase');

  return [text, toCase];
};

module.exports = { getParamsOfUrl };
