const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function checkValidateRequest(errorsTypes, originalText, targetCase) {
  const { notOriginalText, notTargetCase, wrongTargetCase } = errorsTypes;

  const errors = [];

  if (!originalText) {
    errors.push({
      message: notOriginalText,
    });
  }

  if (!targetCase) {
    errors.push({
      message: notTargetCase,
    });
  }

  if (!cases.includes(targetCase) && targetCase) {
    errors.push({
      message: wrongTargetCase,
    });
  }

  return errors;
}

module.exports = { checkValidateRequest };
