function validation(text, toCase) {
  // const queryParams = request.url.split('?');
  // const text = queryParams[0].slice(1);
  // const query = new URLSearchParams(queryParams[1]);
  // const toCase = query.get('toCase');
  const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const errors = [];

  if (!text) {
    errors.push({
      message: 'Text to convert is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message: '"toCase" query param is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (toCase && !validCases.includes(toCase)) {
    errors.push({
      message: 'This case is not supported.'
        + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

module.exports = { validation };
