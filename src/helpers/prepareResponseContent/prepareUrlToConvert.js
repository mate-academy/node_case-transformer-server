const { Case } = require('../../constants/cases');
const { ErrorMessage } = require('../../constants/errors');
const ErrorArray = require('../../errors/ErrorArray');

function prepareUrlToConvert(url) {
  const [pathname, query] = url.split('?');
  const searchParams = new URLSearchParams(query);
  const toCase = searchParams.get('toCase');
  const textToConvert = pathname.slice(1);
  const caseNotSupported = !Object.values(Case).includes(toCase);

  if (!textToConvert || !toCase || caseNotSupported) {
    const errors = [];

    if (!textToConvert) {
      errors.push(new Error(ErrorMessage.missingTextToConvert));
    }

    if (!toCase) {
      errors.push(new Error(ErrorMessage.missingToCase));
    }

    if (toCase && caseNotSupported) {
      errors.push(new Error(ErrorMessage.caseNotSupported));
    }

    throw new ErrorArray(errors);
  }

  return [textToConvert, toCase];
}

module.exports = { prepareUrlToConvert };
