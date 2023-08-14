const error = {
  textIsRequired: `Text to convert is required.
  Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>`,

  invalidCaseName: `This case is not supported.
  Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,

  caseNameIsRequired: `toCase" query param is required.
  Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>`,
};

module.exports = { error };
