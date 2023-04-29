const getTextAndCase = (url) => {
  const urlSplit = url.split('?');
  const params = new URLSearchParams(urlSplit[1]);
  const textToConvert = urlSplit[0].slice(1);
  const toCase = params.get('toCase');

  return [textToConvert, toCase];
};

module.exports.getTextAndCase = getTextAndCase;
