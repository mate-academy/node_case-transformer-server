const validateRequest = (textToConvert, toCase) => {
  const possibleCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const errors = [
    !textToConvert
    /* eslint-disable max-len */
    && { message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
    !toCase
    && { message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
    !(!toCase || possibleCases.includes(toCase.toUpperCase()))
    && { message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' },
  ]
    .filter(Boolean);

  return errors;
};

module.exports = { validateRequest };
