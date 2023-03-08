const setTextToConvert = (url) => {
  return url.split('?')[0].slice(1);
};

module.exports = { setTextToConvert };
