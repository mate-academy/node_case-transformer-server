const possibleCases = [`SNAKE`, 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const notifications = {
  textMissing: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseMissing: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notCorrectCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function inputValidation(toCase, inputText) {
  const errorNotifications = {
    errors: [],
  };

  if (!toCase) {
    errorNotifications.errors.push({
      message: notifications.toCaseMissing,
    });
  }

  if (!inputText) {
    errorNotifications.errors.push({
      message: notifications.textMissing,
    });
  }

  if (toCase && !possibleCases.includes(toCase)) {
    errorNotifications.errors.push({
      message: notifications.notCorrectCase,
    });
  }

  return errorNotifications;
}

module.exports = inputValidation;
