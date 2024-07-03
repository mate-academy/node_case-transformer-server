/* eslint-disable max-len */
const { sendError } = require('./sendError');

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorMessages = {
  noText:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noCase:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidCase:
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const handleErrors = (res, textToConvert, targetCase) => {
  const messages = [];

  if (!textToConvert) {
    messages.push({ message: errorMessages.noText });
  }

  if (!targetCase) {
    messages.push({ message: errorMessages.noCase });
  }

  if (targetCase && !cases.includes(targetCase)) {
    messages.push({ message: errorMessages.invalidCase });
  }

  if (messages.length > 0) {
    sendError(res, 400, messages);

    return true;
  }

  return false;
};

module.exports = { handleErrors };
