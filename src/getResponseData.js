const { convertToCase } = require('./convertToCase');
const { detectCase } = require('./convertToCase/detectCase');

const MISSING_TEXT_ERROR =
  'Text to convert is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const MISSING_CASE_ERROR =
  '"toCase" query param is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const INVALID_CASE_ERROR =
  'This case is not supported. Available cases: ' +
  'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function getResponseData(url) {
  const [originalText, queryString] = url.slice(1).split('?');

  let result;
  const errors = [];

  if (!originalText || originalText.trim() === '') {
    errors.push({ message: MISSING_TEXT_ERROR });
  }

  const params = new URLSearchParams(queryString);
  const targetCase = params.get('toCase');

  if (!targetCase) {
    errors.push({ message: MISSING_CASE_ERROR });
  }

  if (targetCase && !SUPPORTED_CASES.includes(targetCase)) {
    errors.push({ message: INVALID_CASE_ERROR });
  }

  if (errors.length > 0) {
    result = { errors: errors };

    return result;
  }

  const originalCase = detectCase(originalText);

  const { convertedText } = convertToCase(originalText, targetCase);

  result = {
    originalCase: originalCase,
    targetCase: targetCase,
    originalText: originalText,
    convertedText: convertedText,
  };

  return result;
}

module.exports = {
  getResponseData,
};
