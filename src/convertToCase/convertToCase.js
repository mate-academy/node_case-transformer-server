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
function convertToCase(originalText, targetCase) {
  const originalCase = detectCase(originalText);
  const words = toWords(originalText, originalCase);
  const convertedText = wordsToCase(words, targetCase);

  return {
    originalCase,
    targetCase,
    originalText,
    convertedText
  };
}

module.exports = {
  convertToCase,
};
