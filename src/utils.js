const {
  CASE_NOT_SUPPORTED,
  NO_TARGET_CASE,
  NO_TEXT,
} = require('./VALIDATION_ERRORS');

function parseRequestUrl(request) {
  const reqUrl = new URL(request.url, `http://${request.headers.host}`);
  const targetCase = reqUrl.searchParams.get('toCase');
  const originalText = reqUrl.pathname.slice(1);

  return { targetCase, originalText };
}

function validateData(targetCase, originalText) {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  if (!originalText) {
    errors.push({
      message: NO_TEXT,
    });
  }

  if (!targetCase) {
    errors.push({
      message: NO_TARGET_CASE,
    });
  } else if (!cases.includes(targetCase)) {
    errors.push({
      message: CASE_NOT_SUPPORTED,
    });
  }

  return { errors };
}

module.exports = {
  parseRequestUrl,
  validateData,
};
