const { convertToCase } = require('./convertToCase');

function getParams(reqURL) {
  const errors = [];

  const [originalText, query] = reqURL.slice(1).split('?');
  const params = new URLSearchParams(query);
  const targetCase = params.get('toCase');

  if (!originalText) {
    errors.push({
      message: 'Text to convert is required. Correct request is:'
       + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!targetCase) {
    errors.push({
      message: '"toCase" query param is required. Correct request is:'
       + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (targetCase) {
    try {
      convertToCase(originalText, targetCase);
    } catch (err) {
      errors.push({
        message:
          'This case is not supported. Available cases:'
          + ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }
  }

  return {
    errors,
    targetCase,
    originalText,
  };
}

module.exports = {
  getParams,
};
