const validation = (text, toCase) => {
  const errors = [];
  const caseValues = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!text) {
    // eslint-disable-next-line max-len
    errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!toCase) {
    // eslint-disable-next-line max-len
    errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (toCase && !caseValues.includes(toCase)) {
    // eslint-disable-next-line max-len
    errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  return errors.length === 0 ? null : errors;
};

module.exports = { validation };
