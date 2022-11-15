function isError(query, typeCase) {
  const errors = [];

  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!query) {
    errors.push({
      message: 'Text to convert is required.',
    });
  }

  if (!typeCase) {
    errors.push({
      message: 'toCase" query param is required.',
    });
  }

  if (!cases.includes(typeCase)) {
    errors.push({
      message: `This case is not supported. Available cases: ${cases.reduce(
        (acc, singleCase) => acc + singleCase + ' ',
        '',
      )}`,
    });
  }

  return errors;
}

module.exports = { isError };
