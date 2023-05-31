/* eslint-disable max-len */
const getErrors = (text, toCase) => {
  const errors = [];
  const example = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const cases = ['CAMEL', 'SNAKE', 'KEBAB', 'PASCAL', 'UPPER'];

  if (!text) {
    errors.push({ message: `Text to convert is required. Correct request is: ${example}` });
  }

  if (!toCase) {
    errors.push({ message: `"toCase" query param is required. Correct request is: ${example}` });
  }

  if (toCase && !cases.includes(toCase)) {
    errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  return errors;
};

module.exports = { getErrors };
