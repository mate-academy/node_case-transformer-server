/* eslint-disable max-len */
module.exports = {
  textRequired: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseRequired: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notSuportedCase: (availableCases) => `This case is not supported. Available cases: ${availableCases.join(', ')}.`,
};
