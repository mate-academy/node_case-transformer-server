const { validCaseNames } = require('./constants/validCaseNames');

const validateReq = (text, caseName) => {
  const errors = [];
  const correctRequest = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';
  const availableCases = `${validCaseNames.join(', ')}`;
  const errorMessages = {
    TextRequired: `Text to convert is required. Correct request is: ${correctRequest}.`,
    CaseRequired: `"toCase" query param is required. Correct request is: ${correctRequest}.`,
    CaseSupported: `This case is not supported. Available cases: ${availableCases}.`,
  };

  if (!text) {
    errors.push({
      message: errorMessages.TextRequired,
    });
  }

  if (!caseName) {
    errors.push({
      message: errorMessages.CaseRequired,
    });
  }

  if (caseName && !validCaseNames.includes(caseName)) {
    errors.push({
      message: errorMessages.CaseSupported,
    });
  }

  return errors;
};

module.exports = {
  validateReq,
};
