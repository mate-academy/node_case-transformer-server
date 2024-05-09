const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const BASE_ERROR_MESSAGE = `Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;

const ERROR_MESSAGES = {
  toCase: `"toCase" query param is required. ${BASE_ERROR_MESSAGE}`,
  convertRequired: `Text to convert is required. ${BASE_ERROR_MESSAGE}`,
};

function validateInput(originalText, targetCase) {
  const validationMessages = [];

  if (!targetCase) {
    validationMessages.push({
      message: ERROR_MESSAGES.toCase,
    });
  }

  if (!originalText.trim()) {
    validationMessages.push({
      message: ERROR_MESSAGES.convertRequired,
    });
  }

  if (
    targetCase &&
    !SUPPORTED_CASES.some((caseType) => caseType === targetCase.toUpperCase())
  ) {
    validationMessages.push({
      message: `This case is not supported. Available cases: ${SUPPORTED_CASES.map((item) => item).join(', ')}.`,
    });
  }

  return validationMessages;
}

exports.validateInput = validateInput;
