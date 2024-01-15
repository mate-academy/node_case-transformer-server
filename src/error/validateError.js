const validateError = (
  targetCase,
  supportedCases,
  errorMessages,
  originalText,
) => {
  const error = {
    errors: [],
  };

  const isSupportedCases = supportedCases.includes(targetCase);

  if (targetCase) {
    if (!isSupportedCases) {
      error.errors.push({
        message: errorMessages.invalidCase,
      });
    }
  } else {
    error.errors.push({
      message: errorMessages.noToCaseParam,
    });
  }

  if (originalText === '') {
    error.errors.push({
      message: errorMessages.noTextToConvert,
    });
  }

  return error;
};

module.exports = {
  validateError,
};
