/* eslint-disable max-len */
class RequestsError {
  constructor(mess) {
    this.message = mess;
  }
};

const { splitUrl } = require('./splitUrl');
const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorMessages = {
  missedText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missedToCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  incorrectCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function getErrors(path) {
  const errors = [];

  if (!path.includes('?')) {
    errors.push(new RequestsError(errorMessages.missedToCase));

    if (path === '/') {
      errors.push(new RequestsError(errorMessages.missedText));
    }

    return errors;
  }

  const { originalText, targetCase } = splitUrl(path);

  if (!originalText.length) {
    errors.push(new RequestsError(errorMessages.missedText));
  }

  if (!availableCases.includes(targetCase)) {
    errors.push(new RequestsError(errorMessages.incorrectCase));
  }

  return errors;
};

module.exports = { getErrors };
