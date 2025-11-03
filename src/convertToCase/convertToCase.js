const detectCase = require('./detectCase');
const toWords = require('./toWords');
const wordToCase = require('./wordsToCase');

function convertToCase(targetCase, text) {
  const originalCase = detectCase(text);
  const words = toWords(text, originalCase);
  const convertedText = wordToCase(words, targetCase);

  return {
    originalCase,
    convertedText,
  };
}

module.exports = convertToCase;
