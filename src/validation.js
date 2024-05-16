const validation = (text, toCase) => {
  const missingText = {
    requiredText: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    requiredToCase: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    unableToCase: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
  }

  const supportedMessage = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errorMessage = [];

  if (!text) {
    errorMessage.push({ message: missingText.requiredText });
  }

  if (!toCase) {
    errorMessage.push({ message: missingText.requiredToCase });
  }

  if (toCase && !supportedMessage.includes(toCase)) {
    errorMessage.push({ message: missingText.unableToCase });
  }

  return errorMessage;
}

module.exports = { validation }
