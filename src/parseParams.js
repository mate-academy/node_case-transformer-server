function parseParams(req) {
  const [pathname, queryParams] = req.url.split('?');
  const text = pathname.slice(1);
  const params = new URLSearchParams(queryParams);
  const toCase = params.get('toCase');

  return { text, toCase };
}

module.exports = {
  parseParams,
}
