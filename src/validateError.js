/* eslint-disable max-len */
function validateError(textOrigin, toCase) {
  const error = { errors: [] };
  const exampleUrl = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const correctCasses = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!toCase) {
    error.errors.push({
      message: `"toCase" query param is required. Correct request is: ${exampleUrl}`,
    });
  }

  if (textOrigin === '') {
    error.errors.push({
      message: `Text to convert is required. Correct request is: ${exampleUrl}`,
    });
  }

  if (toCase && !correctCasses.includes(toCase)) {
    error.errors.push({
      message:
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return error;
}
module.exports = { validateError };
