/* eslint-disable max-len */

const correctRequest = '/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>';

const ErrorMessage = {
  missingToCase: `"toCase" query param is required. Correct request is: "${correctRequest}".`,
  missingTextToConvert: `Text to convert is required. Correct request is: "${correctRequest}".`,
  caseNotSupported: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = { ErrorMessage };
