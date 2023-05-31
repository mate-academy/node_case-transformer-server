function getTextAndParams(requestURL) {
  const [path, queryString] = requestURL.split('?');
  const text = path.slice(1);
  const params = new URLSearchParams(queryString);
  const targetCase = params.get('toCase');

  return { text, targetCase };
}

module.exports = { getTextAndParams };
