const { convertToCase } = require('./convertToCase');
const { parseUrl } = require('./parseUrl');

function handleRequest(url) {
  const { inputText, inputCase } = parseUrl(url);
  const { originalCase, convertedText } = convertToCase(inputText, inputCase);

  const result = {
    originalCase: originalCase,
    targetCase: inputCase,
    originalText: inputText,
    convertedText,
  };

  return result;
}

module.exports = {
  handleRequest,
};
