const TEXT_MISSING_MSG =
  // eslint-disable-next-line max-len
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TO_CASE_MISSING_MSG =
  // eslint-disable-next-line max-len
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const CASE_NOT_SUPPORTED_MSG =
  // eslint-disable-next-line max-len
  'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

/**
 * @param {URL} req
 * @returns {Array}
 */
function validateUrl(url) {
  const errors = [];

  if (!url.pathname.slice(1)) {
    errors.push({
      message: TEXT_MISSING_MSG,
    });
  }

  const toCase = url.searchParams.get('toCase');

  if (!toCase) {
    errors.push({
      message: TO_CASE_MISSING_MSG,
    });
  } else if (!CASES.includes(toCase)) {
    errors.push({
      message: CASE_NOT_SUPPORTED_MSG,
    });
  }

  return errors;
}

module.exports = {
  validateUrl,
};
