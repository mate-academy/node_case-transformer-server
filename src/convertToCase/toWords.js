const { toCaseValues } = require('../constants');

/**
 * @typedef {'SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'} CaseName
 *
 * @param {string} text
 * @param {CaseName} originalCase
 *
 * @returns {string[]}
 */
function toWords(text, originalCase) {
  const capitalizedCases = [
    toCaseValues.SNAKE,
    toCaseValues.KEBAB,
    toCaseValues.UPPER,
  ];

  if (
    capitalizedCases.includes(originalCase)
  ) {
    return text.split(/[_-]/).map((str) => str.toLowerCase());
  }

  const words = [];
  let lastChar = -1;

  for (let i = 0; i < text.length; i++) {
    if (
      i === text.length - 1
      || text[i + 1].toUpperCase() === text[i + 1]
    ) {
      const word = text
        .slice(lastChar + 1, i + 1)
        .toLowerCase();

      lastChar = i;

      words.push(word);
    }
  }

  return words;
}

module.exports = {
  toWords,
};
