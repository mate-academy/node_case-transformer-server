function getUrlErrors(orirginalText, targetCase) {
  const arrOfMessages = [];
  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!orirginalText) {
    arrOfMessages.push({
      message:
        'Text to convert is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!targetCase) {
    arrOfMessages.push({
      message:
      '"toCase" query param is required. Correct request is: '
      + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (targetCase && !availableCases.includes(targetCase)) {
    arrOfMessages.push({
      message:
      'This case is not supported. Available cases: '
      + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return arrOfMessages;
}

module.exports.getUrlErrors = getUrlErrors;
