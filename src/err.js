function errorCatch(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({ message: 'Text to convert is required' });
  }

  if (!toCase) {
    errors.push({ message: '"toCase" query param is required' });
  }

  if (!['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)) {
    errors.push({ message: 'This case is not supported' });
  }

  return errors;
};

module.exports = { errorCatch };
