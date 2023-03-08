/* eslint-disable max-len */
const massageError = [
  { message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
  { message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
  { message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' },
];

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

export const catchError = (text, toCase) => {
  const errors = [];

  if (!text || text === '/') {
    errors.push(massageError[0]);
  }

  if (!toCase) {
    errors.push(massageError[1]);
  }

  if (!cases.includes(toCase) && toCase) {
    errors.push(massageError[2]);
  }

  return errors;
};
