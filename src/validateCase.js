function validateCase(caseName) {
  return ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(caseName);
}

module.exports = {
  validateCase,
};
