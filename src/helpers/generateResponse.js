'use strict';

const { convertToCase } = require('../convertToCase/convertToCase');

const genereteResponse = (parsedUrl) => {
  const originalText = parsedUrl.text;
  const targetCase = parsedUrl.targetCase;

  const { originalCase, convertedText } = convertToCase(
    originalText,
    targetCase,
  );

  const response = {
    originalCase,
    targetCase,
    originalText,
    convertedText,
  };

  return JSON.stringify(response, null, 2);
};

module.exports = { genereteResponse };
