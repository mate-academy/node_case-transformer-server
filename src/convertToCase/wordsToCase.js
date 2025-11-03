function wordToCase(words, targetCase) {
  switch (targetCase) {
    case 'SNAKE':
      return words.join('_');
    case 'KEBAB':
      return words.join('-');
    case 'CAMEL':
      return words
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join('');
    case 'PASCAL':
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    case 'UPPER':
      return words.join('_').toUpperCase();
    default:
      return words.join(' ');
  }
}

module.exports = wordToCase;
