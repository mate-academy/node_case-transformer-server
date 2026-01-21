/* eslint-disable max-len */
const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const isSearchParamsValid = (textInput, caseInput) => {
  let error = '';

  if (!textInput) {
    error = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  } else if (!caseInput) {
    error = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  } else if (!cases.includes(caseInput)) {
    error = `This case is not supported. Available cases: ${cases}`;
  }

  return error;
};

module.exports = { isSearchParamsValid };
