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
  const originalCase = detectCase(text.split('?')[0]);
  const touse = text.split('?')[0];
  const words = toWords(touse, originalCase);
  const convertedText = wordsToCase(words, caseName);
  // const originalText = touse;
  // const convertedToCase = caseName;

  // return { originalText, originalCase, convertedToCase, convertedText };
  return { originalCase, convertedText };
}

module.exports = {
  convertToCase,
};
