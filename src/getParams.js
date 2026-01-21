const getParams = (url) => {
  const [path, query] = url.split('?');
  const textToConvert = path.slice(1);
  const params = new URLSearchParams(query);
  const toCase = params.get('toCase');

  return { textToConvert, toCase };
};

module.exports = { getParams };
