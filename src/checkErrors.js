function checkErrors(text, toCase) {
  const corectCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = {
    errors: [],
  };

  if (!text) {
    errors.errors.push({
      message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (!toCase) {
    errors.errors.push({
      message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  }

  if (!corectCases.includes(toCase)) {
    errors.errors.push({
      message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
    });
  }

  return errors;
}

module.exports = {
  checkErrors,
};
