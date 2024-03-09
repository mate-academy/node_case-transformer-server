/* eslint-disable quotes */
/* eslint-disable max-len */
const supportedCases = ["SNAKE", "KEBAB", "CAMEL", "PASCAL", "UPPER"];

function checkErrors(convertTo, textToConvert) {
  const errors = [];

  if (!convertTo) {
    errors.push({
      message:
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!textToConvert) {
    errors.push({
      message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (convertTo && !supportedCases.includes(convertTo.toUpperCase())) {
    errors.push({
      message:
        "This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.",
    });
  }

  return errors;
}

module.exports = { checkErrors };
