const isCaseValid = (targetCase) => {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (cases.includes(targetCase)) {
    return true;
  }

  return false;
};

module.exports = { isCaseValid };
