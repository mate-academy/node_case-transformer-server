const { toCaseValues } = require('../constants');

/**
 * @typedef {'SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'} CaseName
 *
 * @param {string} text
 * @returns {CaseName}
 */
function detectCase(text) {
  if (text.toUpperCase() === text) {
    return toCaseValues.UPPER;
  }

  if (text.toLowerCase() === text) {
    if (text.includes('_') || text.includes('-')) {
      // There are no uppercase in the text, so it's one of the lower cases
      // See if they're snake or kebab
      if (text.includes('_')) {
        return toCaseValues.SNAKE;
      }

      if (text.includes('-')) {
        return toCaseValues.KEBAB;
      }
    }
  }

  if (text[0].toUpperCase() === text[0]) {
    return toCaseValues.PASCAL;
  }

  return toCaseValues.CAMEL;
}

module.exports = {
  detectCase,
};
