const caseParamName = 'toCase';
const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const readUrlParams = (url) => {
  const [text, query] = url.slice(1).split('?');

  const params = new URLSearchParams(query);
  const caseName = params.get(caseParamName);

  return { text, caseName };
};

const validateUrlParams = (text, caseName) => {
  const errors = [];
  const caseNotCorrect = !CASES.includes(caseName) && caseName;

  if (!text) {
    errors.push(
      {
        message: 'Text to convert is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      },
    );
  }

  if (!caseName) {
    errors.push(
      {
        message: '"toCase" query param is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      },
    );
  }

  if (caseNotCorrect) {
    errors.push(
      {
        message: 'This case is not supported.'
        + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      },
    );
  }

  if (errors.length > 0) {
    throw errors;
  }
};

module.exports = {
  readUrlParams,
  validateUrlParams,
};
