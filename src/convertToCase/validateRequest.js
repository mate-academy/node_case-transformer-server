const validateRequest = (originalText, targetCase) => {
  const errorMessages = [];

  if (!originalText || originalText.length === 0) {
    /* eslint-disable-next-line max-len */
    errorMessages.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!targetCase || targetCase.length === 0) {
    /* eslint-disable-next-line max-len */
    errorMessages.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  return errorMessages;
};

module.exports = {
  validateRequest,
};
