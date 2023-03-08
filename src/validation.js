const { errorMessage } = require('./errorMessage');
const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validation = (originalText, targetCase) => {
  const allErrors = [];

  if (!originalText) {
    allErrors.push({
      message: errorMessage.emptyText,
    });
  }

  if (!targetCase) {
    allErrors.push({
      message: errorMessage.emptyCase,
    });
  }

  if (!supportedCases.includes(targetCase) && targetCase) {
    allErrors.push({
      message: errorMessage.notSupportedCase,
    });
  }

  return { errors: allErrors };
};

module.exports = { validation };
