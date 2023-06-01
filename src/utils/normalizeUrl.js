function normalizeUrl(req) {
  const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

  const { pathname, searchParams } = normalizedURL;

  const textToFormat = pathname.slice(1);
  const caseToFormat = searchParams.get('toCase');

  return [textToFormat, caseToFormat];
}

module.exports = { normalizeUrl };
