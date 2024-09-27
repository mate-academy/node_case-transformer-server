function convertTextValidation(prevText, caseName) {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  // eslint-disable-next-line max-len
  const responce = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const errors = [];

  const errorMessages = {
    textIsRequired: `Text to convert is required. ${responce}`,
    toCaseIsRequired: `"toCase" query param is required. ${responce}`,
    // eslint-disable-next-line max-len
    caseIsNotSupported: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  };

  const isCase = cases.find((c) => c === caseName);

  if (!prevText) {
    errors.push({ message: errorMessages.textIsMissing });
  }

  if (!caseName) {
    errors.push({ message: errorMessages.toCaseIsMissing });
  }

  if (!isCase && caseName) {
    errors.push({ message: errorMessages.caseIsNotSupported });
  }

  return errors;
};

module.exports = { convertTextValidation };
