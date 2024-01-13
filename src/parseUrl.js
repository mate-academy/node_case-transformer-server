const parseUrl = (url) => {
  const [textToConvert, q] = url.slice(1).split('?');
  const toCase = new URLSearchParams(q).get('toCase');

  return {
    textToConvert,
    toCase,
  };
};

module.exports = { parseUrl };
