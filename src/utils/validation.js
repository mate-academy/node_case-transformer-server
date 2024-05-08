const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateInput(originalText, targetCase) {
  const validationMessages = [];

  if (!targetCase) {
    validationMessages.push({
      message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (!originalText.trim()) {
    validationMessages.push({
      message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (
    targetCase &&
    !SUPPORTED_CASES.some((caseType) => caseType === targetCase.toUpperCase())
  ) {
    validationMessages.push({
      message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
    });
  }

  return validationMessages;
}

exports.validateInput = validateInput;
