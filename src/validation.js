/* eslint-disable max-len */

function handleErrors(reqUrl) {
  const urlParams = reqUrl.split('?');

  const [path, query] = urlParams;
  const queryParams = new URLSearchParams(query);
  const toCase = queryParams.get('toCase');
  const stringToConvert = path.slice(1);

  const errors = [];

  if (!stringToConvert || reqUrl === null) {
    errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!toCase) {
    errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (toCase !== null && (toCase !== 'SNAKE' && toCase !== 'KEBAB' && toCase !== 'CAMEL'
    && toCase !== 'PASCAL' && toCase !== 'UPPER')) {
    errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  return errors;
};

module.exports.handleErrors = handleErrors;
