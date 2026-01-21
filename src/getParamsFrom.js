function getParamsFrom(req) {
  const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
  const originalText = normalizedURL.pathname.slice(1);
  const targetCase = normalizedURL.searchParams.get('toCase');

  return [originalText, targetCase];
}

module.exports = { getParamsFrom };
