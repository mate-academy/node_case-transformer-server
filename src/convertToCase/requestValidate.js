/* eslint-disable max-len */

const possibleCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function requestValidate(originalText, targetCase) {
  const arr = [];

  if (!originalText) {
    arr.push(
      { message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
    );
  }

  if (!targetCase) {
    arr.push(
      { message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
    );
  }

  if (targetCase && !possibleCases.includes(targetCase)) {
    arr.push(
      { message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' },
    );
  }

  if (arr.length) {
    return arr;
  }

  return 0;
};

module.exports.requestValidate = requestValidate;
