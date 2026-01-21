const { convertToCase } = require('./convertToCase/convertToCase');
const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateRequest(urlString) {
  const errors = [];
  let textToConvert = '';
  let targetCase = '';

  try {
    const url = new URL(urlString, 'http://test.com');
    textToConvert = url.pathname.slice(1);
    targetCase = url.searchParams.get('toCase');

    if (!textToConvert) {
      errors.push({
        message: 'Text to convert is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"'
      });
    }

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"'
      });
    } else if (!SUPPORTED_CASES.includes(targetCase)) {
      errors.push({
        message: 'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.'
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      textToConvert,
      targetCase
    };
  } catch (e) {
    errors.push({ message: 'Invalid URL format' });
    return {
      valid: false,
      errors,
      textToConvert,
      targetCase
    };
  }
}

function respondPositively(url) {
  const validation = validateRequest(url);

  if (!validation.valid) {
    return {
      errors: validation.errors
    };
  }

  const { originalCase, convertedText } = convertToCase(
    validation.textToConvert,
    validation.targetCase
  );

  return {
    originalCase,
    targetCase: validation.targetCase,
    originalText: validation.textToConvert,
    convertedText
  };
}

module.exports = {
  validateRequest,
  respondPositively
};
