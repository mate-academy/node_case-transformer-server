const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessages = {
  missingText: 'Text to convert is required. '
  + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missingCase: '"toCase" query param is required. '
  + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notValidCase: 'This case is not supported. '
  + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function validation(textToConvert, caseName) {
  const errors = [];

  if (!textToConvert) {
    errors.push({ message: errorMessages.missingText });
  }

  if (!caseName) {
    errors.push({ message: errorMessages.missingCase });
  } else if (!supportedCases.includes(caseName)) {
    errors.push({ message: errorMessages.notValidCase });
  };

  return errors;
}

module.exports = { validation };
