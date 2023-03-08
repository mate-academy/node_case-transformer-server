function handleErrors(text, caseName) {
  const caseNames = ["SNAKE", "KEBAB", "CAMEL", "PASCAL", "UPPER"];
  const errors = [];

  if (!text) {
    errors.push({
      message:
        "Text to convert is required. Correct request is: " +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!caseName) {
    errors.push({
      message:
        '"toCase" query param is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (caseName && !caseNames.includes(caseName)) {
    errors.push({
      message:
        "This case is not supported. Available cases: " +
        "SNAKE, KEBAB, CAMEL, PASCAL, UPPER.",
    });
  }

  return errors;
}

module.exports = {
  handleErrors,
};
