const validation = (text, toCase) => {
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const baseMessageError
    = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const errors = [];

  if (!text) {
    errors.push({
      message: `Text to convert is required. ${baseMessageError}`,
    });
  }

  if (!toCase) {
    errors.push({
      message: `"toCase" query param is required. ${baseMessageError}`,
    });
  }

  if (toCase && !(supportedCases.includes(toCase))) {
    errors.push({
      message: `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
    });
  }

  return errors;
};

module.exports = { validation };
