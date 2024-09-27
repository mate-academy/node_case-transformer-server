function getData(req) {
  const normalizedUrl = new URL(req.url, `http://${req.headers.host}/`);

  const { pathname, searchParams } = normalizedUrl;
  const textToFormat = pathname.slice(1);
  const caseName = searchParams.get('toCase');

  return { textToFormat, caseName };
}

module.exports = { getData };
