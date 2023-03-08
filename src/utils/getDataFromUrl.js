'use strict';

const getDataFromUrl = (url) => {
  const [textString, queryString] = url.split('?');

  const originalText = textString.slice(1);
  const targetCase = new URLSearchParams(queryString).get('toCase');

  return [originalText, targetCase];
};

module.exports = {
  getDataFromUrl,
};
