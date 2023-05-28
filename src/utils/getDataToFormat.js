const { URL } = require('url');

function getDataToFormat(req) {
  const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

  const { pathname, searchParams } = normalizedUrl;

  const textToFormat = pathname.slice(1);
  const caseToFormat = searchParams.get('toCase');

  return [textToFormat, caseToFormat];
}

module.exports = getDataToFormat;
