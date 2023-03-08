const standartizeURL = (url) => {
  const textToConvert = url.split('?');
  const params = new URLSearchParams(textToConvert[1]);
  const toCase = params.get('toCase');

  return [textToConvert[0].slice(1), toCase];
};

module.exports = {
  standartizeURL,
};
