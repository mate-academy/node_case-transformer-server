/* eslint-disable */
const errorMsg = {
  noText:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noCase:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidCase:
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const toCaseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateRequest(originalText, targetCase) {
  const errorsList = [];

  if (!originalText.length) {
    errorsList.push({
      message: errorMsg.noText,
    });
  }

  if (!targetCase) {
    errorsList.push({
      message: errorMsg.noCase,
    });
  }

  if (targetCase && !toCaseTypes.includes(targetCase)) {
    errorsList.push({
      message: errorMsg.invalidCase,
    });
  }

  if (errorsList.length) {
    return {
      errors: errorsList,
    };
  }
}

module.exports = { validateRequest };
