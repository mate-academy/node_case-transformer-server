function getTextAndCase(req) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const text = url.pathname.slice(1);
  const toCase = url.searchParams.get('toCase');

  return [text, toCase];
}

module.exports = { getTextAndCase };
