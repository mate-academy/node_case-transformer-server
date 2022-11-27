const getError = (req) => {
  const errors = [];

  const requestPartsArr = req.url.split('?');
  const text = requestPartsArr[0].slice(1);
  const params = new URLSearchParams(requestPartsArr[1]);
  const toCase = params.get('toCase');

  const supportedCase = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const isCaseSupport = supportedCase.includes(toCase);

  const missingText = 'Text to convert is required.'
  + ' '
  + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

  const missingParams = '"toCase" query param is required.'
  + ' '
  + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

  const caseNotSupported = 'This case is not supported.'
  + ' '
  + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

  if (!text) {
    errors.push({
      message: missingText,
    });
  }

  if (!toCase) {
    errors.push({
      message: missingParams,
    });
  }

  if (!isCaseSupport && toCase !== null) {
    errors.push({
      message: caseNotSupported,
    });
  }

  return { errors };
};

module.exports = {
  getError,
};
