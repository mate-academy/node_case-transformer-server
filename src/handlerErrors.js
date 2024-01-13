const errors = [];

function handlerErrors(SUPPORTED_CASES, textToTransform, caseType) {
  errors.length = 0;

  if (!textToTransform) {
    errors.push({
      message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }
  
  if (!caseType) {
    errors.push({
      message:
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }
  
  if (!SUPPORTED_CASES.includes(caseType) && caseType) {
    errors.push({
      message:
      `This case is not supported. Available cases: ${SUPPORTED_CASES.join(', ')}.`,
    });
  }

  if (errors.length > 0) {
    throw errors;
  }
}

module.exports = { handlerErrors, errors }