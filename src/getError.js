const { SUPPORTED_CASE, errorsType } = require('./const.js');

const getError = (req) => {
  const errors = [];

  const requestPartsArr = req.url.split('?');
  const text = requestPartsArr[0].slice(1);
  const params = new URLSearchParams(requestPartsArr[1]);
  const toCase = params.get('toCase');

  const isCaseSupport = SUPPORTED_CASE.includes(toCase);

  if (!text) {
    errors.push({
      message: errorsType.missingText,
    });
  }

  if (!toCase) {
    errors.push({
      message: errorsType.missingParams,
    });
  }

  if (!isCaseSupport && toCase !== null) {
    errors.push({
      message: errorsType.caseNotSupported,
    });
  }

  return { errors };
};

module.exports = {
  getError,
};
