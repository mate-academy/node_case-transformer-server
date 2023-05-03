function checkerErrors(messageToConvert, paramsToConvert) {
  const convertParameters = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  if (!convertParameters.includes(paramsToConvert)
      && paramsToConvert !== null) {
    errors.push({
      // eslint-disable-next-line max-len
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (!messageToConvert) {
    errors.push({
      // eslint-disable-next-line max-len
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (paramsToConvert === null) {
    errors.push({
      // eslint-disable-next-line max-len
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  return errors;
}

module.exports = { checkerErrors };
