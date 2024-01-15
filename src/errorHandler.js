const REQUIRE_TEXT_MESSAGE = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TOCASE_MISSING = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TOCASE_NOT_ALLOWED = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const CASE_NAME = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function errorHandler(originalText, targetCase) {
  const errorsObj = { 'errors': [] };

  if (!originalText) {
    errorsObj.errors.push({ 'message': REQUIRE_TEXT_MESSAGE });
  }

  if (!targetCase) {
    errorsObj.errors.push({ 'message': TOCASE_MISSING });
  }

  if (targetCase && (!CASE_NAME.includes(targetCase))) {
    errorsObj.errors.push({ 'message': TOCASE_NOT_ALLOWED });
  }

  return errorsObj;
}

module.exports = {
  errorHandler,
}
