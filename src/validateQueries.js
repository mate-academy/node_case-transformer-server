function validateQueries(textToConvert, caseName) {
  const errors = [];
  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const request = `"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;

  if (!textToConvert) {
    errors.push({
      message: 'Text to convert is required. Correct request is: ' + request,
    });
  }

  if (!caseName) {
    errors.push({
      message: '"toCase" query param is required. Correct request is: ' + request,
    });
  } else if (!availableCases.includes(caseName)) {
    errors.push({
      message: 'This case is not supported. Available cases: ' + `${availableCases.join(', ')}.`,
    });
  }

  return errors;
}

module.exports = { validateQueries };
