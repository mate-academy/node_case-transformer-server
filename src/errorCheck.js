function errorCheck(originalText, targetCase) {
  const errorPayload = {
    errors: [],
  };

  const possibleCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!originalText) {
    errorPayload.errors.push(
      { message: 'Text to convert is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
    );
  }

  if (!targetCase) {
    errorPayload.errors.push(
      { message: '"toCase" query param is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
    );
  } else if (!possibleCases.includes(targetCase)) {
    errorPayload.errors.push(
      { message: 'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' },
    );
  }

  return errorPayload;
}

module.exports = { errorCheck };
