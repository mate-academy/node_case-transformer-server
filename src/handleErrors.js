const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const requestTemplate = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const casesList = `${supportedCases.join(', ')}.`;

const errorMessages = {
  textError: `Text to convert is required. Correct request is: ${requestTemplate}`,
  caseError: `"toCase" query param is required. Correct request is: ${requestTemplate}`,
  caseValidationError: `This case is not supported. Available cases: ${casesList}`,
};

module.exports = {
  errorMessages,
  supportedCases,
};
