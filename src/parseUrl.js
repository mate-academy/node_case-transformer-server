function parseUrl(req) {
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);

  const textToConvert = pathname.slice(1);
  const toCase = searchParams.get('toCase');

  return [textToConvert, toCase];
}

module.exports = {
  parseUrl,
};
