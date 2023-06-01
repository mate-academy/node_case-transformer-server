const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const regs = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';
const errorMessages = {
  TextRequired: `Text to convert is required. Correct request is: ${regs}.`,
  CaseRequired: `"toCase" query param is required. Correct request is: ${regs}.`,
  CaseSupported: `This case is not supported. Available cases: ${cases.join(', ')}.`,
};

const getErrors = (textToFormat, toCase) => {
  const errors = [];

  if (!textToFormat) {
    errors.push({ message: errorMessages.TextRequired });
  }

  if (!toCase) {
    errors.push({ message: errorMessages.CaseRequired });
  }

  if (toCase && !cases.includes(toCase)) {
    errors.push({ message: errorMessages.CaseSupported });
  }

  return errors;
};

module.exports = { getErrors };
