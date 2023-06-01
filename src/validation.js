/* eslint-disable max-len */
const validation = (textToConvert, toCase) => {
  const errorsObject = { errors: [] };
  const errorMessages = {
    missingText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    missingTargetCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    wrongTargetCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  };
  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!textToConvert) {
    errorsObject.errors.push({ message: errorMessages.missingText });
  };

  if (!toCase) {
    errorsObject.errors.push({ message: errorMessages.missingTargetCase });
  };

  if (toCase && !availableCases.includes(toCase)) {
    errorsObject.errors.push({ message: errorMessages.wrongTargetCase });
  };

  return errorsObject;
};

module.exports = { validation };
