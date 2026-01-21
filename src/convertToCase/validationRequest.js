const VALID_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validationRequest(originalText, targetCase, validationErrors) {
  if (!originalText) {
    validationErrors.push(
      `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    );
  }

  if (!targetCase) {
    validationErrors.push(
      `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    );
  } else if (!VALID_CASES.includes(targetCase)) {
    validationErrors.push(
      `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
    );
  }
}

module.exports = {
  validationRequest,
};
