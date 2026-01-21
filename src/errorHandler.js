function errorHandler(res, textToConvert, toCase) {
  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const isTextApsent = textToConvert.length === 0;
  const isToCaseParamApsent = toCase === null;
  const isToCaseUnaccepted =
    !availableCases.includes(toCase) && !isToCaseParamApsent;
  const isTextApsentErrorMsg =
    'Text to convert is required. Correct request' +
    ' is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const isToCaseParamApsentErrorMsg =
    '"toCase" query param is required.' +
    ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const isToCaseUnacceptedErrorMsg =
    'This case is not supported. Available' +
    ' cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

  const errorMsgsArray = [];

  if (isTextApsent) {
    const errorMessage = {
      message: isTextApsentErrorMsg,
    };

    errorMsgsArray.push(errorMessage);
  }

  if (isToCaseParamApsent) {
    const errorMessage = {
      message: isToCaseParamApsentErrorMsg,
    };

    errorMsgsArray.push(errorMessage);
  }

  if (isToCaseUnaccepted) {
    const errorMessage = {
      message: isToCaseUnacceptedErrorMsg,
    };

    errorMsgsArray.push(errorMessage);
  }

  if (errorMsgsArray.length > 0) {
    res.end(
      JSON.stringify({
        errors: errorMsgsArray,
      }),
    );

    return true;
  }
}

module.exports = { errorHandler };
