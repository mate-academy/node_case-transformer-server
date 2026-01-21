/* eslint-disable max-len */
const correctResponce = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const errorMessages = {
  textIsMissing: `Text to convert is required. ${correctResponce}`,
  toCaseIsMissing: `"toCase" query param is required. ${correctResponce}`,
  caseIsNotSupported: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const checkTextAndCase = (text, targetCase) => {
  const errors = [];
  const {
    textIsMissing,
    toCaseIsMissing,
    caseIsNotSupported,
  } = errorMessages;

  if (!text) {
    errors.push({ message: textIsMissing });
  }

  if (!targetCase) {
    errors.push({ message: toCaseIsMissing });
  }

  if (!validCases.includes(targetCase) && targetCase) {
    errors.push({ message: caseIsNotSupported });
  }

  return errors;
};

module.exports = { checkTextAndCase };
