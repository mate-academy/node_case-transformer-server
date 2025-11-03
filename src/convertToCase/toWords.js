function toWords(input, caseType) {
  const text = typeof input === 'string' ? input : String(input);

  switch (caseType) {
    case 'SNAKE':
    case 'UPPER':
      return text.toLowerCase().split('_');
    case 'KEBAB':
      return text.toLowerCase().split('-');
    case 'CAMEL':
    case 'PASCAL':
      return text
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .split(' ')
        .map((w) => w.toLowerCase());
    default:
      return [String(text)];
  }
}

module.exports = toWords;
