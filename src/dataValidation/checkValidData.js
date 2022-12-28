const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const checkRequestParameters = (text, toCase) => {
  const errors = [];

  if (!text) {
    errors.push({ message: 'Text to convert is required. Correct request is: '
    + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  };

  if (!toCase) {
    errors.push({ message: '"toCase" query param is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  };

  if (!availableCases.includes(toCase) && toCase) {
    errors.push({ message: `This case is not supported. Available cases: ${availableCases.join(', ')}.` });
  }

  return errors;
};

module.exports = { checkRequestParameters };
