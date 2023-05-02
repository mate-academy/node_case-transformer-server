function getUrlParams(textString, queryString) {
  const params = new URLSearchParams(queryString);
  const targetCase = params.get('toCase');

  const originalText = textString.slice(1);

  return { originalText, targetCase };
};

module.exports = { getUrlParams };
