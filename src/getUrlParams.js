const getUrlParams = (text, query) => {
  const originalText = text.slice(1);
  const normalizedUrl = new URLSearchParams(query);
  const targetCase = normalizedUrl.get('toCase');

  return {
    originalText,
    targetCase,
  };
};

module.exports = { getUrlParams };
