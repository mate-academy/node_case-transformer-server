const casesToConvert = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validate(text = '', toCase) {
  const errors = [];

  if (!text.length) {
    errors.push({ message: 'Text to convert is required.'
      + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (toCase === null) {
    errors.push({
      message: '"toCase" query param is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (typeof toCase === 'string' && !casesToConvert.includes(toCase)) {
    errors.push({
      message: 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return { errors };
}

module.exports = {
  validate,
};
