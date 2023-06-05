function normalizeURL(req) {
  const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

  const { pathname, searchParams } = normalizedURL;

  const text = pathname.slice(1);
  const toCase = searchParams.get('toCase');

  return [text, toCase];
}

module.exports = { normalizeURL }
