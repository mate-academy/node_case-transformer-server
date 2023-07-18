function validateRequest(string, toCase) {
  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errorArray = [];
  const isStringEmpty = string.length === 0;
  const isInvalidToCaseParam = toCase === null;
  const isAviableToCase = availableCases.includes(toCase);

  if (isStringEmpty) {
    // eslint-disable-next-line max-len
    errorArray.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (isInvalidToCaseParam) {
    // eslint-disable-next-line max-len
    errorArray.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!isAviableToCase && toCase) {
    // eslint-disable-next-line max-len
    errorArray.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  const isNoErrors = errorArray.length === 0;

  return {
    isValid: isNoErrors,
    errorArray,
  };
};

module.exports = { validateRequest };
