const textCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validate(textToFormat, caseToFormat) {
  const errors = [];

  if (!textToFormat) {
    errors.push(
      'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".'
    );
  }

  if (!caseToFormat) {
    errors.push(
      '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".'
    );
  }

  if (!textCases.includes(caseToFormat) && caseToFormat) {
    errors.push(
      'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.'
    );
  }

  return errors;
}

module.exports = validate;
