const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validationService(textToConvert, convertType) {
  const noTextToConvert = !textToConvert;
  const noConvertType = !convertType;
  const validContentType = !availableCases.includes(convertType);

  const isDataUnValid = noTextToConvert || noConvertType || validContentType;

  if (!isDataUnValid) {
    return { isDataUnValid };
  }

  const result = [];

  if (noTextToConvert) {
    result.push({
      message: 'Text to convert is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (noConvertType) {
    result.push({
      message: '"toCase" query param is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (validContentType && !noConvertType) {
    result.push({
      message: 'This case is not supported.'
        + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return { isDataUnValid, errors: result };
}

module.exports = { validationService };
