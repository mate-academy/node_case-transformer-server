const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validationService(textToConvert, convertType) {
  const noTextToConvert = !textToConvert;
  const noConvertType = !convertType;
  const invalidContentType = !availableCases.includes(convertType);

  const isDataInvalid = noTextToConvert || noConvertType || invalidContentType;

  if (!isDataInvalid) {
    return { isDataInvalid };
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

  if (invalidContentType && !noConvertType) {
    result.push({
      message: 'This case is not supported.'
        + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return { isDataInvalid, errors: result };
}

module.exports = { validationService };
