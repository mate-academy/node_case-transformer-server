/* eslint-disable max-len */

const errorMessages = {
  putText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  insertQueryParam: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notCorrectCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const typeOfCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validation(originalText, targetCase) {
  const errorsArray = [];

  if (!originalText) {
    errorsArray.push({
      message: errorMessages.putText,
    });
  }

  if (!targetCase) {
    errorsArray.push({
      message: errorMessages.insertQueryParam,
    });
  }

  if (!typeOfCases.includes(targetCase) && targetCase) {
    errorsArray.push({
      message: errorMessages.notCorrectCase,
    });
  }

  if (errorsArray.length) {
    throw errorsArray;
  }
}

module.exports = {
  validation,
};
