
const handleErrors = (toCase, text) => {
  const errors = [];
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!toCase) {
    errors.push({
      // eslint-disable-next-line max-len
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!text.length) {
    errors.push({
      // eslint-disable-next-line max-len
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!cases.includes(toCase) && toCase) {
    errors.push({
      // eslint-disable-next-line max-len
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
};

module.exports = {
  handleErrors,
};
