const validateData = (textToValidate, toCase) => {
  const validCases = [
    'SNAKE',
    'KEBAB',
    'CAMEL',
    'PASCAL',
    'UPPER',
  ];
  const errorMessages = {
    noText: 'Text to convert is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    noToCase: '"toCase" query param is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    notValidCase: 'This case is not supported.'
    + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  };

  const { noText, noToCase, notValidCase } = errorMessages;

  const errors = [];

  if (!textToValidate) {
    errors.push(
      {
        message: noText,
      },
    );
  }

  if (!toCase) {
    errors.push({
      message: noToCase,
    });
  }

  if (toCase && !validCases.includes(toCase)) {
    errors.push(
      {
        message: notValidCase,
      },
    );
  }

  return {
    isError: errors.length > 0,
    errorMessages: errors.length > 0 ? errors : null,
  };
};

module.exports = { validateData };
