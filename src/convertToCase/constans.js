const PORT = process.argv.PORT || 5700;
const availableToCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorMessage = {
  textRequired: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  caseRequired: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  caseSupported: `This case is not supported. Available cases: ${availableToCases.join(', ')}.`,
};

module.exports = { PORT, availableToCases, errorMessage };
