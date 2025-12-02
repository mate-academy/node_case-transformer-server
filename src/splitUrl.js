const splitUrl = (url) => {
  const split = url.split('?');

  const path = split[0];
  const textToConvert = path.slice(1);

  const queryString = split[1];
  const params = new URLSearchParams(queryString);

  const toCase = params.get('toCase');

  return { textToConvert, toCase };
};

module.exports = { splitUrl };
