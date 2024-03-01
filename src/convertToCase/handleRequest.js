const { convertToCase } = require('./convertToCase');
const { parseUrl } = require('./parseUrl');

function handleRequest(url) {
  const parsedUrl = parseUrl(url);

  const { inputText, inputCase, errors } = parsedUrl;

  if (errors.length > 0) {
    return { errors };
  }

  const { originalCase, convertedText } = convertToCase(inputText, inputCase);

  const result = {
    originalCase,
    targetCase: inputCase,
    originalText: inputText,
    convertedText,
  };

  return result;
}

module.exports = {
  handleRequest,
};
