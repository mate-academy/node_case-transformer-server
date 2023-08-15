/* eslint-disable max-len */
'use strict';

const errMesages = {
  NOTEXT: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NOPARAM: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  INVALIDCASE: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  INVALIDFORAMT: 'Format of request is invalid. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>',
};

const toCaseValues = [
  'SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER',
];

function getUrlText(url) {
  const indexOfSlash = url.indexOf('/');
  const indexOfQMark = url.indexOf('?');

  if (indexOfSlash === -1) {
    return '/';
  }

  if (indexOfQMark === -1) {
    return url.slice(indexOfSlash).trim();
  }

  return url.slice(indexOfSlash, indexOfQMark).trim();
}

function getUrlErrMessages(url) {
  const errors = [];

  const isToCaseExists = url.match(/toCase/);

  const isUrlNoText = getUrlText(url) === '/';

  if (isUrlNoText) {
    errors.push({ message: errMesages.NOTEXT });
  }

  if (!isToCaseExists) {
    errors.push({ message: errMesages.NOPARAM });
  }

  const toCaseValue = url.slice(url.indexOf('=') + 1);

  if (isToCaseExists && !toCaseValues.includes(toCaseValue)) {
    errors.push({ message: errMesages.INVALIDCASE });
  }

  return errors;
}

module.exports = { getUrlErrMessages };
