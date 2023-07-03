const isCaseValid = (targetCase) => {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  return cases.includes(targetCase);
};

module.exports = { isCaseValid };
