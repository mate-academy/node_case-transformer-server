const errors = require('../errors.json');
const { supportedCases } = require('../constants/supportedCases');

function prepareUrl(urlFromWeb, baseUrl) {
  const dataFromUrl = new URL(urlFromWeb, `http://${baseUrl}`);
  const textFromUrl = dataFromUrl.pathname.slice(1);
  const caseFromUrl = dataFromUrl.searchParams.get('toCase');
  const appearedErrors = [];

  if (!textFromUrl) {
    appearedErrors.push(errors.missedTextToConvert);
  }

  if (!caseFromUrl) {
    appearedErrors.push(errors.missedCaseToConvert);
  } else if (!supportedCases.includes(caseFromUrl)) {
    appearedErrors.push(errors.notSupportedCase);
  }

  return {
    textToConvert: textFromUrl,
    caseToConvert: caseFromUrl,
    errorArr: appearedErrors,
  };
}

module.exports = {
  prepareUrl,
};
