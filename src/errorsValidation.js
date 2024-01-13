const errorsValidation = (isError, textToTransform, typeTransform, cases, errorMessages) => {

  if (!textToTransform) {
    errorMessages.errors.push({
      message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!typeTransform) {
    errorMessages.errors.push({
      message:
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!cases.includes(typeTransform) && typeTransform) {
    errorMessages.errors.push({
      message:
        `This case is not supported. Available cases: ${cases.join(', ')}.`,
    });
  }
}

module.exports = { errorsValidation };

