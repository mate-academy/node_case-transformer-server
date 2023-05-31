const validation = (pathname, toCase) => {
  const errors = [];
  const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const validQuery = /^[a-zA-Z]+$/;

  if (!pathname.length) {
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
  } else if (!validQuery.test(toCase)) {
    errors.push({
      message: 'Invalid format for "toCase" query param.'
     + 'Only letters are allowed.',
    });
  } else if (!(validCases.includes(toCase))) {
    errors.push({
      message: 'This case is not supported.'
      + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
};

module.exports = { validation };
