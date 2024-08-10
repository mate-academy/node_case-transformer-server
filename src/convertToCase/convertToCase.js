/* eslint-disable no-undef, max-len */

const { detectCase } = require('./detectCase');
const { toWords } = require('./toWords');
const { wordsToCase } = require('./wordsToCase');

function convertToCase(caseName, text) {
  const originalCase = detectCase(text);
  const words = toWords(text, originalCase);
  const convertedText = wordsToCase(words, caseName);

  return {
    originalCase,
    convertedText,
  };
}

module.exports = { convertToCase };
