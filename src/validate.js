const TEXT_ERROR = `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;
const CASE_ERROR = `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;
const CASE_TYPE_ERROR = `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`;
const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validate = (text, caseName) => {
  const errors = [];

  if (!text) {
    errors.push({
      message: TEXT_ERROR,
    });
  }

  if (!caseName) {
    errors.push({
      message: CASE_ERROR,
    });
  } else if (!CASES.includes(caseName)) {
    errors.push({
      message: CASE_TYPE_ERROR,
    });
  }

  return errors;
};

module.exports = {
  validate,
};
