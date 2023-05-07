/* eslint-disable max-len */
const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessages = {
  no_text: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  no_toCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  non_valid_toCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const validateData = (textToConvert, toCase) => {
  const errorsToShow = [];

  if (!textToConvert) {
    errorsToShow.push({ message: `${errorMessages.no_text}` });
  };

  if (!toCase) {
    errorsToShow.push({ message: `${errorMessages.no_toCase}` });
  };

  if (!supportedCases.includes(toCase) && toCase) {
    errorsToShow.push({ message: `${errorMessages.non_valid_toCase}` });
  };

  return errorsToShow;
};

module.exports = { validateData };
