const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const regs = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';
const errorMessages = {
  Error: `Text to convert is required. Correct request is: ${regs}.`,
  Error2: `"toCase" query param is required. Correct request is: ${regs}.`,
  Error3: `This case is not supported. Available cases: ${cases.join(', ')}.`,
};

const getErrors = (textToFormat, toCase) => {
  const errors = [];

  if (!textToFormat) {
    errors.push({ message: errorMessages.Error });
  }

  if (!toCase) {
    errors.push({ message: errorMessages.Error2 });
  }

  if (toCase && !cases.includes(toCase)) {
    errors.push({ message: errorMessages.Error3 });
  }

  return errors;
};

module.exports = { getErrors };
