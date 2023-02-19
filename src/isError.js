/* eslint-disable max-len */
function isError(text, caseToCheck) {
  const typeOfCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const error = [];

  if (!text) {
    error.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!caseToCheck) {
    error.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!typeOfCases.includes(caseToCheck) && caseToCheck) {
    error.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  return error;
}

module.exports = { isError };
