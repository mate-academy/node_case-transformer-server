const PORT = process.env.PORT || 5701;
const SUPPORTEDCASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const ERRORMESSAGE = {
  textRequired: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  caseRequired: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  caseSupported: `This case is not supported. Available cases: ${SUPPORTEDCASES.join(', ')}.`,
};

module.exports = { PORT, SUPPORTEDCASES, ERRORMESSAGE };
