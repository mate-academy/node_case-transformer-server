/* eslint-disable max-len */
const findErrors = (text, caseName) => {
  const errors = [];

  if (!text || text === '') {
    errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!caseName) {
    errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  const possibleCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (caseName && !possibleCases.includes(caseName)) {
    errors.push({
      message: `This case is not supported. Available cases: ${possibleCases.join(
        ', ',
      ) + '.'}`,
    });
  }

  return errors;
};

module.exports = {
  findErrors,
};
