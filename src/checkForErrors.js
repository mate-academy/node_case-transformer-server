const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function checkForErrors(originalText, targetCase) {
  const errorMessages = [];

  if (!originalText) {
    errorMessages.push('Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  }

  if (!targetCase) {
    errorMessages.push('"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  } else if (!CASES.includes(targetCase)) {
    errorMessages.push('This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
  }

  return errorMessages.map((message) => ({ message }));
}

module.exports = {
  checkForErrors,
};
