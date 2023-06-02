function normalizeUrl(request) {
  const normalizedUrl = new URL(request.url, `http://${request.headers.host}/`);

  const { pathname, searchParams } = normalizedUrl;
  const caseType = searchParams.get('toCase');
  const textToConvert = pathname.slice(1);

  return [textToConvert, caseType];
}

module.exports = {
  normalizeUrl,
};
