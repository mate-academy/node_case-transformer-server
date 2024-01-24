
const BASE = 'http://localhost:5700';

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

/* eslint-disable max-len */

const ERROR_MESSAGES = {
  noText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noCaseName: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  caseIsNotSupported: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

/* eslint-enable max-len */

function getValidation(url) {
  const normalizedURL = new URL(url, BASE);
  const validationInfo = {
    errors: [],
    originalText: normalizedURL.pathname.slice(1),
    targetCase: normalizedURL.searchParams.get('toCase'),
  };

  if (!validationInfo.originalText) {
    validationInfo.errors.push({ message: ERROR_MESSAGES.noText });
  }

  if (!validationInfo.targetCase) {
    validationInfo.errors.push({ message: ERROR_MESSAGES.noCaseName });
  } else if (!SUPPORTED_CASES.includes(validationInfo.targetCase)) {
    validationInfo.errors.push({ message: ERROR_MESSAGES.caseIsNotSupported });
  }

  return validationInfo;
}

module.exports = { getValidation };
