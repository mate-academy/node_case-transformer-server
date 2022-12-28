const getErrors = (textToConvert, caseToChange) => {
  const errors = [];

  const avaibleCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (textToConvert.length === 0) {
    errors.push(
      {
        message: 'Text to convert is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      },
    );
  }

  if (!caseToChange || caseToChange.length === 0) {
    errors.push(
      {
        message: '"toCase" query param is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      },
    );
  }

  if (!avaibleCases.includes(caseToChange) && caseToChange) {
    errors.push(
      {
        message: 'This case is not supported.'
          + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      },
    );
  }

  return errors;
};

module.exports = { getErrors };
