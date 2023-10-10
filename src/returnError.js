const allowedCases = [
  'SNAKE',
  'KEBAB',
  'CAMEL',
  'UPPER',
  'PASCAL',
];

const ERRORS = {
  INVALID_CASE: 'This case is not supported.'
    + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  NO_TEXT: 'Text to convert is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_CASE: '"toCase" query param is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
};

function getErrors(textFromRequest, caseFromRequest) {
  const errors = [];

  if (!textFromRequest) {
    errors.push({ message: ERRORS.NO_TEXT });
  }

  if (!caseFromRequest) {
    errors.push({ message: ERRORS.NO_CASE });
  }

  if (caseFromRequest && !allowedCases.includes(caseFromRequest)) {
    errors.push({ message: ERRORS.INVALID_CASE });
  }

  return errors;
}

module.exports = { getErrors };
