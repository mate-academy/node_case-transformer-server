function isValidToCase(toCase) {
  return ['CAMEL', 'PASCAL', 'SNAKE', 'KEBAB', 'UPPER'].includes(toCase);
};

module.exports = {
  isValidToCase,
};
