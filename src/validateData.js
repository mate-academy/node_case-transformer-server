function validateText(text) {
  if (!text) {
    return {
      message:
        'Text to convert is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    };
  }

  return null;
}

const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateToCase(toCase) {
  if (!toCase) {
    return {
      message:
        '"toCase" query param is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    };
  }

  if (!availableCases.includes(toCase.toUpperCase())) {
    return {
      message:
        'This case is not supported. Available cases: ' +
        'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    };
  }

  return null;
}

module.exports = { validateText, validateToCase };
