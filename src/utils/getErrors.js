const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function getErrors(originalText, toCase) {
  const errors = [];

  if (!originalText.trim()) {
    errors.push({
      message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (!toCase) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (toCase && !CASES.includes(toCase)) {
    errors.push({
      message: `This case is not supported. Available cases: ${CASES.join(', ')}.`,
    });
  }

  if (errors.length) {
    throw errors;
  }
}

module.exports = getErrors;
