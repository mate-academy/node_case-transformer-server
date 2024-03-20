const validateCaseAndText = (caseType, text) => {
  const errorMessages = [];
  const validCaseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const validCaseTypesString = validCaseTypes.join(', ');
  const isCaseValid = validCaseTypes.includes(caseType);
  const correctRequestString =
    'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

  if (!text) {
    errorMessages.push(`Text to convert is required. ${correctRequestString}`);
  }

  if (!caseType) {
    errorMessages.push(
      `"toCase" query param is required. ${correctRequestString}`,
    );
  }

  if (!isCaseValid && Boolean(caseType)) {
    errorMessages.push(
      `This case is not supported. Available cases: ${validCaseTypesString}.`,
    );
  }

  return errorMessages;
};

module.exports = { validateCaseAndText };
