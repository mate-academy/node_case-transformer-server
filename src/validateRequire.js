const validateRequire = (text, caseName) => {
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];
  const requestTemplate = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const casesList = `${supportedCases.join(', ')}.`;

  if (!text) {
    errors.push({
      message: `Text to convert is required. Correct request is: ${requestTemplate}`,
    });
  }

  if (!caseName) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: ${requestTemplate}`,
    });
  }

  if (caseName && !supportedCases.includes(caseName)) {
    errors.push({
      message: `This case is not supported. Available cases: ${casesList}`,
    });
  }

  return errors;
};

module.exports = {
  validateRequire,
};
