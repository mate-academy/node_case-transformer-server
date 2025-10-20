const { convertToCase } = require('./convertToCase/convertToCase');

const ALLOWED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function handleErrors(textToConvert, convertToFormat) {
  const errorMessages = [];

  if (!textToConvert) {
    errorMessages.push(
      'Text to convert is required. Correct request is:' +
        ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    );
  }

  if (!convertToFormat) {
    errorMessages.push(
      '"toCase" query param is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    );
  } else if (!ALLOWED_CASES.includes(convertToFormat)) {
    errorMessages.push(
      `This case is not supported. Available cases: ${ALLOWED_CASES.join(', ')}.`,
    );
  }

  return errorMessages;
}

function createResponse(errorMessages, textToConvert, convertToFormat) {
  let statusCode = null;
  let response = null;

  if (errorMessages.length !== 0) {
    statusCode = 400;

    response = {
      errors: errorMessages.map((error) => {
        return { message: error };
      }),
    };
  } else {
    statusCode = 200;

    const convertResult = convertToCase(textToConvert, convertToFormat);

    response = {
      originalCase: convertResult.originalCase,
      targetCase: convertToFormat,
      originalText: textToConvert,
      convertedText: convertResult.convertedText,
    };
  }

  return { statusCode, response };
}

function determineResponse(textToConvert, convertToFormat) {
  const errors = handleErrors(textToConvert, convertToFormat);

  return createResponse(errors, textToConvert, convertToFormat);
}

module.exports = { determineResponse };
