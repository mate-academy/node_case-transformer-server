const {
  MISSING_TEXT,
  TO_CASE_INCORRECT,
  TO_CASE_MISSING,
} = require('./errorTexts.js');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateUrl(url) {
  const res = {
    correct: true,
    messages: [],
    passedUrl: url,
  };

  const BASE = 'http://localhost:5700';

  const normalizedUrl = new URL(url, BASE);

  const pathname = normalizedUrl.pathname;

  if (pathname.length <= 1) {
    res.correct = false;

    res.messages.push(MISSING_TEXT);
  }

  const toCase = normalizedUrl.searchParams.get('toCase');

  if (toCase === null) {
    res.correct = false;

    res.messages.push(TO_CASE_MISSING);
  }

  if (toCase !== null && !checkToCase(toCase)) {
    res.correct = false;

    res.messages.push(TO_CASE_INCORRECT);
  }

  return res;
}

function checkToCase(toCase) {
  if (CASES.includes(toCase)) {
    return true;
  }

  return false;
}

module.exports = { validateUrl };
