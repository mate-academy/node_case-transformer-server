function readingParamsFromURL(request) {
  const [pathName, queryParams] = request.url.split('?');
  const originalText = pathName.slice(1);
  const params = new URLSearchParams(queryParams);
  const targetCase = params.get('toCase');

  return [originalText, targetCase];
};

module.exports = {
  readingParamsFromURL,
};
