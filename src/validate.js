const validCases = ['SNAKE', 'CAMEL', 'KEBAB', 'PASCAL', 'UPPER'];

const noTextErrorMessage =
  'Text to convert is required. ' +
  'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const noParamsErrorMessage =
  '"toCase" query param is required. ' +
  'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const invalidCaseErrorMessage =
  'This case is not supported. ' +
  'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function createMessage(message) {
  return { message: message };
}

function validate(textToConvert, toCase) {
  const response = {};
  const errors = [];

  const isInvalidCase = !validCases.includes(toCase);

  if (!textToConvert || !toCase || isInvalidCase) {
    response.statusCode = 400;
    response.statusText = 'Bad Request';

    if (!textToConvert) {
      errors.push(createMessage(noTextErrorMessage));
    }

    if (!toCase) {
      errors.push(createMessage(noParamsErrorMessage));
    }

    if (isInvalidCase && !!toCase) {
      errors.push(createMessage(invalidCaseErrorMessage));
    }

    response.errors = errors;
    response.valid = false;
  } else {
    response.valid = true;
  }

  return response;
}

module.exports = { validate };
