const getParams = (url) => {
  const textToConvert = url.split('?')[0].slice(1);
  const query = url.split('?')[1];
  const params = new URLSearchParams(query);
  const toCase = params.get('toCase');

  return [textToConvert, toCase];
};

module.exports = { getParams };
