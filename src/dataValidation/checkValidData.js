const avaibleCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errosMassega = {
  emptyText() {
    return `Text to convert is required. ${this.requestExample}".`;
  },

  emptyCase() {
    return `"toCase" query param is required. ${this.requestExample}".`;
  },

  ivalidCase() {
    return `This case is not supported. Available cases: ${avaibleCases.join(', ')}.`;
  },

  requestExample: 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>',
};

const checkRequestParameters = (text, toCase) => {
  const errors = [];

  if (!text) {
    errors.push({ message: errosMassega.emptyText() });
  };

  if (!toCase) {
    errors.push({ message: errosMassega.emptyCase() });
  };

  if (!avaibleCases.includes(toCase) && toCase) {
    errors.push({ message: errosMassega.ivalidCase() });
  }

  return errors;
};

module.exports = { checkRequestParameters };
