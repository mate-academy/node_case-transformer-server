'use strict';

const handleRequest = (req) => {
  const textToTransform = req.url.slice(1).split('?')[0];
  const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const queryString = req.url.slice(1).split('?')[1];
  const params = new URLSearchParams(queryString);
  const toCase = params.get('toCase');

  return {
    textToTransform,
    allowedCases,
    toCase,
  };
};

module.exports = {
  handleRequest,
};
