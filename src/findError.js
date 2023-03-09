/* eslint-disable max-len */
const containerErrors = [
  { message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
  { message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
  { message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' },
];

const validCaseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const findError = (text, caseName) => {
  const containerFoundErrors = [];

  if (!text) {
    containerFoundErrors.push(containerErrors[0]);
  }

  if (!caseName) {
    containerFoundErrors.push(containerErrors[1]);
  }

  if (!(validCaseNames.includes(caseName)) && caseName) {
    containerFoundErrors.push(containerErrors[2]);
  }

  return containerFoundErrors;
};

module.exports = {
  findError,
};
