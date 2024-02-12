const { toCaseValues } = require('../constants');

/**
 * @typedef {'SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'} CaseName
 *
 * @param {string[]} words
 * @param {CaseName} caseName
 *
 * @returns {string}
 */
function wordsToCase(words, caseName) {
  switch (caseName) {
    case toCaseValues.SNAKE: {
      return words.join('_');
    }

    case toCaseValues.KEBAB: {
      return words.join('-');
    }

    case toCaseValues.UPPER: {
      return words.map((word) => word.toUpperCase()).join('_');
    }

    case toCaseValues.PASCAL: {
      return words.map((word) => {
        return `${word[0].toUpperCase()}${word.slice(1)}`;
      }).join('');
    }

    case toCaseValues.CAMEL: {
      return words.map((word, index) => {
        if (index === 0) {
          return word;
        }

        return `${word[0].toUpperCase()}${word.slice(1)}`;
      }).join('');
    }

    default: {
      throw new Error(`Unknown case name: ${caseName}`);
    }
  }
}

module.exports = {
  wordsToCase,
};
