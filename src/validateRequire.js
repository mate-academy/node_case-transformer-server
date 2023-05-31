const validateRequire = (text, caseName) => {
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];
  const requestTemplate = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const casesList = `${supportedCases.join(', ')}.`;

  const addErrorMessage = (message) => {
    errors.push({
      message,
    });
  };

  if (!text) {
    addErrorMessage(`Text to convert is required. Correct request is: ${requestTemplate}`);
  }

  if (!caseName) {
    addErrorMessage(`"toCase" query param is required. Correct request is: ${requestTemplate}`);
  }

  if (caseName && !supportedCases.includes(caseName)) {
    addErrorMessage(`This case is not supported. Available cases: ${casesList}`);
  }

  return errors;
};

module.exports = {
  validateRequire,
};
