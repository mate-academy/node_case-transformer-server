const getUrlParams = (text, query) => {
  const originalText = text.slice(1);

  const params = new URLSearchParams(query);
  const targetCase = params.get('toCase');

  return { originalText, targetCase };
};

module.exports = { getUrlParams };
