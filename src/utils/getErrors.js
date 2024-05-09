const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function getErrors(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push({
      message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (!targetCase) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (targetCase && !CASES.includes(targetCase.toUpperCase())) {
    errors.push({
      message: `This case is not supported. Available cases: ${CASES.join(', ')}.`,
    });
  }

  return errors;
}

module.exports = { getErrors };
