const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const regs = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';
const errorMessages = [
  {
    message: `Text to convert is required. Correct request is: ${regs}.`,
  },
  {
    message: `"toCase" query param is required. Correct request is: ${regs}.`,
  },
  {
    message: `This case is not supported. Available cases: ${cases.join(
      ', ',
    )}.`,
  },
];

const getErrors = (textToFormat, toCase) => {
  const errors = [];

  if (!textToFormat) {
    errors.push(errorMessages[0]);
  }

  if (!toCase) {
    errors.push(errorMessages[1]);
  }

  if (toCase && !cases.includes(toCase)) {
    errors.push(errorMessages[2]);
  }

  return errors;
};

module.exports = { getErrors };
