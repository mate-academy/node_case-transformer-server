/* eslint-disable no-undef, max-len */

const { detectCase } = require('./detectCase');
const { toWords } = require('./toWords');
const { wordsToCase } = require('./wordsToCase');

function convertToCase(caseName, text) {
  const originalCase = detectCase(text);
  const newText = toWords(text, originalCase);
  const convertedText = wordsToCase(newText, caseName);

  return {
    originalCase,
    convertedText,
  };
}

module.exports = { convertToCase };
