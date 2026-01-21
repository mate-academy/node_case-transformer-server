'use strict';

const getUrlComponents = (url) => {
  const splitedURL = (url.split('?'));
  const params = new URLSearchParams(splitedURL[1]);
  const originalText = splitedURL[0].slice(1);
  const targetCase = params.get('toCase');

  return {
    originalText,
    targetCase,
  };
};

module.exports = { getUrlComponents };
