/* eslint-disable max-len */

const missingText =
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const missingCase =
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const wrongCase =
  'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function validateUrl(url) {
  const givenUrl = new URL(url);
  const responseErrors = { errors: [] };
  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const caseFromUrl = givenUrl.searchParams.get('toCase');

  if (!givenUrl.pathname || givenUrl.pathname === '/') {
    responseErrors.errors.push({ message: missingText });
  }

  if (!caseFromUrl) {
    responseErrors.errors.push({ message: missingCase });
  } else if (!availableCases.includes(caseFromUrl)) {
    responseErrors.errors.push({ message: wrongCase });
  }

  if (!responseErrors.errors.length) {
    return { valid: true };
  }

  return { valid: false, errors: responseErrors };
}

module.exports = {
  validateUrl,
};
