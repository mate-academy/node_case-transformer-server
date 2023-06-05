function request(req) {
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const text = pathname.slice(1);
  const toCase = searchParams.get('toCase');

  return { text, toCase };
}

module.exports = { request };
