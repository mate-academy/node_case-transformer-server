const validator = (textToConvert, toCase) => {
  const availableCase = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const messageError = { errors: [] };

  const messageAdd = (messageText) => {
    messageError.errors.push({
      message: messageText,
    });
  };

  if (toCase && !availableCase.includes(toCase)) {
    messageAdd(
      'This case is not supported. ' +
        'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    );
  }

  if (!textToConvert) {
    messageAdd(
      'Text to convert is required. ' +
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    );
  }

  if (!toCase) {
    messageAdd(
      '"toCase" query param is required. ' +
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    );
  }

  return messageError;
};

module.exports = { validator };
