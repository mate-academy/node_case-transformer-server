/* eslint-disable max-len */

function checkErrors(textToConvert, caseName) {
  const errors = [];
  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!textToConvert) {
    errors.push({
      message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"',
    });
  }

  if (!caseName) {
    errors.push({
      message:
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"',
    });
  } else {
    if (!availableCases.includes(caseName)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER',
      });
    }
  }

  return errors;
}

module.exports = {
  checkErrors,
};
