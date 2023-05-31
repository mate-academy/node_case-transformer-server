const supportedCases = require('./supportedCases');

const notification = {
  textMissing: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseMissing: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseNotExist: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};


function validateParams(toCase, textToConvert) {
  const errorNotifications = {
    errors: [],
  };

  if (!textToConvert) {
    errorNotifications.errors.push({
      message: notification.textMissing,
    });
  }

  if (!toCase) {
    errorNotifications.errors.push({
      message: notification.toCaseMissing,
    });
  }

  if (toCase && !supportedCases.includes(toCase)) {
    errorNotifications.errors.push({
      message: notification.toCaseNotExist,
    });
  }

  return errorNotifications;
}

module.exports = validateParams;
