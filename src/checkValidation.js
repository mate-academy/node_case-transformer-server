const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const availableCases = ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';
const correctRequest = (
  ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".'
);

const checkValidation = (text, toCase) => {
  const errorMessages = [];

  if (!text) {
    errorMessages.push({
      message: `Text to convert is required.${correctRequest}`,
    });
  }

  if (!toCase) {
    errorMessages.push({
      message: `"toCase" query param is required.${correctRequest}`,
    });
  }

  if (toCase && !validCases.includes(toCase)) {
    errorMessages.push({
      message: `This case is not supported.${availableCases}`,
    });
  }

  return errorMessages;
};

module.exports = { checkValidation };
