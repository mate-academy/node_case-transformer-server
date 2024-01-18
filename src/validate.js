function validate(textToConvert, toCase) {
  const errors = [];
  const validCases = ['SNAKE', 'CAMEL', 'KEBAB', 'PASCAL', 'UPPER'];

  if (!textToConvert) {
    errors.push({
      // eslint-disable-next-line max-len
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".\n',
    });
  }

  if (!toCase) {
    errors.push({
      // eslint-disable-next-line max-len
      message: 'toCase query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>',
    });
  }

  if (toCase && !validCases.includes(toCase)) {
    console.log(toCase);

    errors.push({
      // eslint-disable-next-line max-len
      message: `This case is not supported. Available cases: ${validCases.join(', ')}.`,
    });
  }

  return errors;
}

module.exports = { validate };
