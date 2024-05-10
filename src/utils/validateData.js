const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const ERROR_MESSAGE = `Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;

function validateData(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push({
      message: `Text to convert is required. ${ERROR_MESSAGE}`,
    });
  }

  if (!targetCase) {
    errors.push({
      message: `"toCase" query param is required. ${ERROR_MESSAGE}`,
    });
  }

  if (targetCase && !CASES.includes(targetCase.toUpperCase())) {
    errors.push({
      message: `This case is not supported. Available cases: ${CASES.join(', ')}.`,
    });
  }

  if (errors.length) {
    throw errors;
  }
}

module.exports = { validateData };
