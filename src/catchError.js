/* eslint-disable max-len */
const massageError = {
  messageUrlParams: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  messageQuery: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  messageCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

export const catchError = (text, toCase) => {
  const errors = [];

  if (!text || text === '/') {
    errors.push(massageError.messageUrlParams);
  }

  if (!toCase) {
    errors.push(massageError.messageQuery);
  }

  if (!cases.includes(toCase) && toCase) {
    errors.push(massageError.messageCase);
  }

  return errors;
};
