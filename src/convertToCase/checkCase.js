const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const checkCase = (caseName) => {
  return cases.includes(caseName);
};

module.exports = { checkCase };
