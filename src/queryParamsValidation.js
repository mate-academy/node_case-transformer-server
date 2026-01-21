function queryParamsValidation(wordToConvert, toCase) {
  const errors = [];
  const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!wordToConvert) {
    errors.push({
      message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (toCase && !validCases.includes(toCase)) {
    errors.push({
      message: `This case is not supported. Available cases: ${validCases.join(', ')}.`,
    });
  }

  if (!toCase) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  return errors;
}

module.exports = queryParamsValidation;
