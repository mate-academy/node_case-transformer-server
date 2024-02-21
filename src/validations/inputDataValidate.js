function inputDataValidate(text, caseName) {
  const errors = [];

  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!text) {
    const message = 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    errors.push({ message });
  }

  if (!caseName) {
    const message = '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    errors.push({ message });
  }

  if (!cases.includes(caseName) && caseName) {
    const message = 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

    errors.push({ message });
  }

  return errors;
}

module.exports = {
  inputDataValidate,
};
