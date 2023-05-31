/* eslint-disable max-len */
const validation = (textToConvert, toCase) => {
  const errorsObject = { errors: [] };
  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!textToConvert) {
    errorsObject.errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  };

  if (!toCase) {
    errorsObject.errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (toCase && !availableCases.includes(toCase)) {
    errorsObject.errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  return errorsObject;
};

module.exports = { validation };
