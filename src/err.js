function errorCatch(text, toCase) {
  const errors = {
    noText: 'Text to convert is required',
    noCase: 'toCase query param is required',
    wrongCase: 'This case is not supported',
  };
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const errorMessages = [];

  if (!text) {
    errorMessages.push(errors.noText);
  }

  if (!toCase) {
    errorMessages.push(errors.noCase);
  }

  if (!cases.includes(toCase)) {
    errorMessages.push(errors.wrongCase);
  }

  return errorMessages;
}

module.exports = { errorCatch };
