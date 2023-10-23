/**
 * @typedef {'SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'} CaseName
 *
 * @param {string[]} words
 * @param {CaseName} caseName
 *
 * @returns {string}
 */
function wordsToCase(words, caseName) {
  if (caseName === 'SNAKE') {
    return words.join('_');
  } else if (caseName === 'KEBAB') {
    return words.join('-');
  } else if (caseName === 'UPPER') {
    return words.map(word => word.toUpperCase()).join('_');
  } else if (caseName === 'PASCAL') {
    return words.map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join('');
  } else if (caseName === 'CAMEL') {
    return words.map((word, index) => {
      if (index === 0) {
        return word;
      }
      return `${word[0].toUpperCase()}${word.slice(1)}`;
    }).join('');
  } else {
    throw new Error(`Unknown case name: ${caseName}`);
  }
}

module.exports = {
  wordsToCase,
};
