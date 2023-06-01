/* eslint-disable max-len */
const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const warningNotifications = {
  emptyTextMessage: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  emptyCaseMessage: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidCaseMessage: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function getError(toCase, inputText) {
  const errorNotifications = {
    errors: [],
  };

  if (!toCase) {
    errorNotifications.errors.push({
      message: warningNotifications.emptyCaseMessage,
    });
  }

  if (!inputText) {
    errorNotifications.errors.push({
      message: warningNotifications.emptyTextMessage,
    });
  }

  if (toCase && !validCases.includes(toCase)) {
    errorNotifications.errors.push({
      message: warningNotifications.invalidCaseMessage,
    });
  }

  return errorNotifications;
}

module.exports = {
  getError,
};
