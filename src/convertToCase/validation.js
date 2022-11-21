const validate = (textToConvert = '', toCase) => {
  const errorsMessages = [];
  const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!textToConvert) {
    errorsMessages.push({ message: 'Text to convert is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (toCase === null) {
    errorsMessages.push({ message: '"toCase" query param is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!CASES.includes(toCase) && toCase !== null) {
    errorsMessages.push({ message: 'This case is not supported.'
    + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  return errorsMessages;
};

module.exports = { validate }