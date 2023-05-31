const validateReq = (text, caseName) => {
  const validCaseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];
  const correctRequest = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const availableCases = `${validCaseNames.join(', ')}.`;

  if (!text) {
    errors.push({
      message: `Text to convert is required. Correct request is: ${correctRequest}`,
    });
  }

  if (!caseName) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: ${correctRequest}`,
    });
  }

  if (caseName && !validCaseNames.includes(caseName)) {
    errors.push({
      message: `This case is not supported. Available cases: ${availableCases}`,
    });
  }

  return errors;
};

module.exports = {
  validateReq,
};
