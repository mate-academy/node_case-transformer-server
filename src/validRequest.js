/* eslint-disable max-len */
function validRequest(text, targetCase) {
  const errorsObj = { errors: [] };
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!text) {
    errorsObj.errors.push({ message:
      'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!targetCase) {
    errorsObj.errors.push({ message:
      '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (targetCase && !cases.includes(targetCase)) {
    errorsObj.errors.push({ message:
      'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  return errorsObj;
}

module.exports = {
  validRequest,
};
