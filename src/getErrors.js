/* eslint-disable max-len */
const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const messageTextDoesNotExist = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const messageCaseDoesNotExist = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const messageCaseTypeIsNotValid = `This case is not supported. Available cases: ${CASES.join(', ')}.`;

const getErrors = (text, caseType) => {
  const errors = [];

  if (!text) {
    errors.push({
      message: messageTextDoesNotExist,
    });
  }

  if (!caseType) {
    errors.push({
      message: messageCaseDoesNotExist,
    });
  }

  if (!CASES.includes(caseType) && caseType) {
    errors.push({
      message: messageCaseTypeIsNotValid,
    });
  }

  return errors;
};

exports.getErrors = getErrors;
