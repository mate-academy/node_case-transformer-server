const validateError = (
  targetCase,
  supportedCases,
  erorrMessages,
  originalText,
) => {
  const error = {
    errors: [],
  };

  const isSupportedCase = supportedCases.includes(targetCase);

  if (targetCase) {
    if (!isSupportedCase) {
      error.errors.push({
        message: erorrMessages.invalidCase,
      });
    }
  } else {
    error.errors.push({
      message: erorrMessages.noToCaseParam,
    });
  }

  if (originalText === '') {
    error.errors.push({
      message: erorrMessages.noTextToConvert,
    });
  }

  return error;
};

module.exports = {
  validateError,
};
