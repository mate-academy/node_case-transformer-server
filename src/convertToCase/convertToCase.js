const { detectCase } = require('./detectCase');
const { toWords } = require('./toWords');
const { wordsToCase } = require('./wordsToCase');

/**
 * @typedef {'SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'} CaseName
 *
 * @param {string} text
 * @param {CaseName} caseName
 *
 * @typedef {object} Result
 * @property {CaseName} originalCase
 * @property {string} convertedText
 *
 * @returns {Result}
 */
function convertToCase(text, caseName) {
  const originalCase = detectCase(text);
  const words = toWords(text, originalCase);
  const convertedText = wordsToCase(words, caseName);

  return { originalCase, convertedText };
}

module.exports = {
  convertToCase,
};

