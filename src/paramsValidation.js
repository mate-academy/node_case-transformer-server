const { convertToCaseErrors } = require('./utils');

const caseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const paramsValidation = (originalText, targetCase) => {
  const errors = [];

  if (!originalText) {
    errors.push({
      message: convertToCaseErrors.originalText,
    });
  }

  if (!targetCase) {
    errors.push({
      message: convertToCaseErrors.targetCase,
    });
  }

  if (targetCase && !caseName.includes(targetCase)) {
    errors.push({
      message: convertToCaseErrors.unSupportedTargeCase,
    });
  }

  return errors;
};

module.exports = { paramsValidation };
