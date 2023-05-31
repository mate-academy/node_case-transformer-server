'use strict';

const handleRequest = (req) => {
  const textToTransform = req.url.slice(1).split('?')[0];
  const queryString = req.url.slice(1).split('?')[1];
  const params = new URLSearchParams(queryString);
  const toCase = params.get('toCase');

  return {
    textToTransform,
    toCase,
  };
};

module.exports = {
  handleRequest,
};
