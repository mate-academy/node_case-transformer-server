const CASE_LIST = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const isValidCase = (caseName) => {
  return CASE_LIST.includes(caseName);
};

module.exports = {
  isValidCase,
  CASE_LIST,
};
