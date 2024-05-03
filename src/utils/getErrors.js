function getErrors(
  textToConvert,
  toCase,
  casesToConvert,
  { textToConvertError, toCaseError, caseToConvertError },
) {
  const errors = [];

  if (!textToConvert) {
    errors.push({
      message: textToConvertError,
    });
  }

  if (!toCase) {
    errors.push({
      message: toCaseError,
    });
  } else if (!casesToConvert.includes(toCase.toUpperCase())) {
    errors.push({
      message: caseToConvertError,
    });
  }

  return errors;
}
module.exports = { getErrors };
