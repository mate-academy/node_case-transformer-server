function validateCase(caseName) {
  switch (caseName) {
    case 'SNAKE':
    case 'KEBAB':
    case 'UPPER':
    case 'PASCAL':
    case 'CAMEL':
      return true;
    default:
      return false;
  }
}

module.exports = {
  validateCase,
};
