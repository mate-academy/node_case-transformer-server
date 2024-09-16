const { convertToCase } = require('./convertToCase/convertToCase');

const validateRequest = (errors, requestArgs) => {
  const { originalText, targetCase } = requestArgs;

  let caseConversionInfo = {
    originalCase: null,
    convertedText: null,
  };

  if (!originalText) {
    errors.push({
      message: 'Text to convert is required. Correct request is: '
      + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!targetCase) {
    errors.push({
      message: '"toCase" query param is required. Correct request is: '
      + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else {
    try {
      caseConversionInfo = convertToCase(originalText, targetCase);
    } catch {
      errors.push({
        message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }
  }

  return {
    ...requestArgs,
    ...caseConversionInfo,
  };
};

module.exports = { validateRequest };
