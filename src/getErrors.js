const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function getErrors(textToConvert, toCase) {
  const errors = [];

  if (!textToConvert) {
    errors.push({
      message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (!toCase) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  } else if (!SUPPORTED_CASES.includes(toCase)) {
    errors.push({
      message: `This case is not supported. Available cases: ${SUPPORTED_CASES.join(', ')}.`,
    });
  }

  return errors;
}

module.exports = {
  getErrors,
};
