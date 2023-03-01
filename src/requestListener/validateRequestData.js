const VALID_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const ERROR_MESSAGE = {
  ENOTEXT: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  ENOCASE: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  EIVCASE: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const isValidCase = caseToValidate => VALID_CASES.some(c => c === caseToValidate);

const validateData = (text, targetCase) => {
  const errors = [];

  if (!text) {
    errors.push('ENOTEXT');
  }

  if (!targetCase) {
    errors.push('ENOCASE');
  } else if (!isValidCase(targetCase)) {
    errors.push('EIVCASE');
  }

  return errors;
};
