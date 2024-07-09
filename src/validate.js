/* eslint-disable max-lines */
function validate(targetWord, toCase) {
  const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errorsArray = [];
  const TEXT_TO_CONVERT_ERROR =
    'Text to convert is required.' +
    ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

  const TO_CASE_ERROR =
    '"toCase" query param is required.' +
    ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

  const NOT_SUPPORTED_CASE =
    'This case is not supported.' +
    ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

  if (!targetWord) {
    errorsArray.push({
      message: TEXT_TO_CONVERT_ERROR,
    });
  }

  if (!toCase) {
    errorsArray.push({
      message: TO_CASE_ERROR,
    });
  }

  if (toCase && !SUPPORTED_CASES.includes(toCase)) {
    errorsArray.push({
      message: NOT_SUPPORTED_CASE,
    });
  }

  return errorsArray;
}

module.exports = { validate };
