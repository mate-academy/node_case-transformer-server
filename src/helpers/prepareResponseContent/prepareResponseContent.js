const { convertToCase } = require('./../convertToCase');
const { prepareUrlToConvert } = require('./prepareUrlToConvert');

async function prepareResponseContent(request) {
  const [textToConvert, toCase] = prepareUrlToConvert(request.url);
  const { originalCase, convertedText } = convertToCase(textToConvert, toCase);

  const response = {
    originalCase,
    targetCase: toCase,
    originalText: textToConvert,
    convertedText,
  };

  return JSON.stringify(response);
}

module.exports = { prepareResponseContent };
