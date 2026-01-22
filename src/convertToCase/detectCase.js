/**
 * @typedef {'SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'} CaseName
 *
 * @param {string} text
 * @returns {CaseName}
 */
function detectCase(text) {
  if (text.toUpperCase() === text) {
    return 'UPPER';
  }

  if (text.toLowerCase() === text) {
    if (text.includes('_') || text.includes('-')) {
      if (text.includes('_')) {
        return 'SNAKE';
      }

      if (text.includes('-')) {
        return 'KEBAB';
      }
    }
  }

  if (text[0].toUpperCase() === text[0]) {
    return 'PASCAL';
  }

  return 'CAMEL';
}

module.exports = {
  detectCase,
};
