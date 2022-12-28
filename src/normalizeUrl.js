const normalizeUrl = (req) => {
  const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
  const text = normalizedURL.pathname.slice(1);
  const toCase = normalizedURL.searchParams.get('toCase');

  return [text, toCase];
};

module.exports = { normalizeUrl };
