function getTextAndToCase(request) {
  const normalizedUrl = new URL(request.url, `http://${request.headers.host}`);

  const text = normalizedUrl.pathname.slice(1);
  const toCase = normalizedUrl.searchParams.get('toCase');

  return [text, toCase];
}

module.exports = { getTextAndToCase };
