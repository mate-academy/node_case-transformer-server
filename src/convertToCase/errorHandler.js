/**
 * @typedef {'SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'} CaseName
 *
 * @param {string} requestedPath
 * @param {toCase} caseName
 * @param {object} res
 *
 * @typedef {undefined} Result
 *
 * @returns {Result}
 */

function errorHandler(requestedPath, toCase) {
  const errors = [];

  if (requestedPath === '') {
    const message = `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;

    errors.push({
      message,
    });
  }

  if (!toCase) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
    });
  } else if (!['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)) {
    errors.push({
      message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
    });
  }

  return errors.length ? errors : null;
}

module.exports = {
  errorHandler,
};
