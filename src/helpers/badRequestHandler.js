/* eslint-disable no-undef, max-len */

const REQUEST_MESSAGES = {
  emptyTextToConvert:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  emptyQueryParam:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  unsupportedCase:
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  notFound: 'Not Found',
};

function badRequestHandler(...checkResults) {
  const requestJsonObj = {};

  if (!requestJsonObj.hasOwnProperty('errors')) {
    requestJsonObj.errors = [];
  }

  for (const checkResult of checkResults) {
    if (Object.keys(REQUEST_MESSAGES).includes(checkResult)) {
      requestJsonObj.errors.push({ message: REQUEST_MESSAGES[checkResult] });
    } else {
      requestJsonObj.errors.push({ message: REQUEST_MESSAGES.notFound });
    }
  }

  return JSON.stringify(requestJsonObj);
}

module.exports = {
  badRequestHandler,
};
