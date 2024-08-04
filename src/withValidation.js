const { ERRORS, CASES_TO_CONVERT } = require('./constants');

const withValidation = (callback) => (req, res) => {
  const { pathname, searchParams } = new URL(req.url, 'https://localhost:5700');

  const toCase = searchParams.get('toCase');
  const text = pathname.replace('/', '');

  const errors = [];

  if (!text) {
    errors.push({
      message: ERRORS.TEXT_TO_CONVERT_IS_REQUIRED,
    });
  }

  if (!toCase) {
    errors.push({
      message: ERRORS.CONVERT_TO_IS_REQUIRED,
    });
  }

  if (toCase && !CASES_TO_CONVERT.includes(toCase)) {
    errors.push({
      message: ERRORS.CONVERT_TO_IS_INVALID,
    });
  }

  return callback({ text, toCase, errors }, res);
};

module.exports = {
  withValidation,
};
