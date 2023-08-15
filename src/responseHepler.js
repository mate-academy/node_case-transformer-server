const createErrorResponse = (errorMessages) => {
  return {
    "errors": errorMessages.map(errorMessage => {
      return {
        "message": errorMessage
      }
    })
  }
}

const createSuccessResponse = (originalCase, targetCase, originalText, convertedText) => {
  return {
    "originalCase": originalCase,
    "targetCase": targetCase,
    "originalText": originalText,
    "convertedText": convertedText,
  }
}

module.exports = {
  createErrorResponse,
  createSuccessResponse,
};

