const parseUrl = (url) => {
  const [text, queryString] = url.slice(1).split('?');
  const params = new URLSearchParams(queryString);
  const caseName = params.get('toCase');

  return { text, caseName };
};

module.exports = {
  parseUrl,
};
