function detectCase(text) {
  if (typeof text !== 'string') {
    return 'UNKNOWN';
  }

  if (/^[A-Z_]+$/.test(text)) {
    return 'UPPER';
  }

  if (text.includes('_')) {
    return 'SNAKE';
  }

  if (text.includes('-')) {
    return 'KEBAB';
  }

  if (/^[A-Z]/.test(text) && /[a-z]/.test(text)) {
    return 'PASCAL';
  }

  if (/^[a-z]/.test(text) && /[A-Z]/.test(text)) {
    return 'CAMEL';
  }

  return 'UNKNOWN';
}

module.exports = detectCase;
