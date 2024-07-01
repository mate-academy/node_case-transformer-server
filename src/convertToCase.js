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

function detectCase(text) {
  if (text.toUpperCase() === text) {
    return 'UPPER';
  }

  if (text.toLowerCase() === text) {
    if (text.includes('_') || text.includes('-')) {
      // There are no uppercase in the text, so it's one of the lower cases
      // See if they're snake or kebab
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

function toWords(text, originalCase) {
  if (['SNAKE', 'KEBAB', 'UPPER'].includes(originalCase)) {
    return text.split(/[_-]/).map((str) => str.toLowerCase());
  }

  const words = [];
  let lastChar = -1;

  for (let i = 0; i < text.length; i++) {
    if (i === text.length - 1 || text[i + 1].toUpperCase() === text[i + 1]) {
      const word = text.slice(lastChar + 1, i + 1).toLowerCase();

      lastChar = i;

      words.push(word);
    }
  }

  return words;
}

function wordsToCase(words, caseName) {
  switch (caseName) {
    case 'SNAKE': {
      return words.join('_');
    }

    case 'KEBAB': {
      return words.join('-');
    }

    case 'UPPER': {
      return words.map((word) => word.toUpperCase()).join('_');
    }

    case 'PASCAL': {
      return words
        .map((word) => {
          return `${word[0].toUpperCase()}${word.slice(1)}`;
        })
        .join('');
    }

    case 'CAMEL': {
      return words
        .map((word, index) => {
          if (index === 0) {
            return word;
          }

          return `${word[0].toUpperCase()}${word.slice(1)}`;
        })
        .join('');
    }

    default: {
      throw new Error(`Unknown case name: ${caseName}`);
    }
  }
}

module.exports = {
  convertToCase,
};
