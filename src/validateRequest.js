const cases = ['SNAKE', 'KEBAB', 'UPPER', 'PASCAL', 'CAMEL'];

const validateCase = (originalText, targetCase) => {
  const errors = [];

  if (!originalText || !targetCase) {
    errors.push('Both paramaters have to be present');
  }

  if (!cases.includes(targetCase)) {
    /* eslint-disable max-len */
    errors.push(
      "Enter a valid target case. Consider one of the following: ['SNAKE', 'KEBAB', 'UPPER', 'PASCAL', 'CAMEL']",
    );
  }

  return errors;
};

module.exports = {
  validateCase,
};
