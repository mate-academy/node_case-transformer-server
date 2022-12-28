function getTextAndToCase(request) {
  const queryParams = request.url.split('?');
  const text = queryParams[0].slice(1);
  const query = new URLSearchParams(queryParams[1]);
  const toCase = query.get('toCase');

  return [text, toCase];
}

module.exports = { getTextAndToCase };
