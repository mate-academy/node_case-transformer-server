/* eslint-disable max-len */
class Errors {
  static noTextError =
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  static noCaseError =
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  static unsupportedCaseError =
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';
}

module.exports = {
  Errors,
};
