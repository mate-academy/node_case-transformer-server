const getRequestParts = (url) => {
  const wordsToConvert = url.pathname.slice(1);
  const toCase = url.searchParams.get('toCase');

  return {
    wordsToConvert,
    toCase,
  };
};

module.exports = {
  getRequestParts,
};
