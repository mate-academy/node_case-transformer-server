const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function errorObjectCreator(msg) {
  return {
    message: msg,
  };
}

function validateData(textToConvert, toCase) {
  const errorObject = {
    errors: [],
  };

  if (!textToConvert || typeof textToConvert !== 'string') {
    errorObject.errors.push(
      errorObjectCreator(
        `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      ),
    );
  }

  if (!toCase || typeof toCase !== 'string') {
    errorObject.errors.push(
      errorObjectCreator(
        `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      ),
    );
  }

  if (toCase && !cases.includes(toCase)) {
    errorObject.errors.push(
      errorObjectCreator(
        `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      ),
    );
  }

  return [Boolean(!errorObject.errors.length), errorObject];
}

module.exports = {
  validateData,
};
