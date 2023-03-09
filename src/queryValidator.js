const queryValidator = (text, caseType) => {
  const errors = [];
  const caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!text) {
    const errorMessage = {
      // eslint-disable-next-line max-len
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    };

    errors.push(errorMessage);
  }

  if (!caseType) {
    const errorMessage = {
      // eslint-disable-next-line max-len
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    };

    errors.push(errorMessage);
  }

  if (caseType && !caseTypes.includes(caseType)) {
    const errorMessage = {
      // eslint-disable-next-line max-len
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    };

    errors.push(errorMessage);
  }

  return errors;
};

module.exports = {
  queryValidator,
};
