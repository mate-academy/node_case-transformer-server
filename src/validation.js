const { cases } = require('./cases');

/* eslint-disable max-len */
const validate = (textToEdit, param) => {
  const errorsMessages = {
    errors: [],
  };

  if (!textToEdit.length) {
    errorsMessages.errors.push({
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!param) {
    errorsMessages.errors.push({
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (!Object.values(cases).includes(param)) {
    errorsMessages.errors.push({
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errorsMessages;
};

module.exports = { validate };
