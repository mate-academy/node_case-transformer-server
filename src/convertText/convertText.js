function convertText(text, caseName) {
  const { convertToCase } = require('../convertToCase');
  const convertedText = convertToCase(text, caseName);

  return convertedText;
}

module.exports = {
  convertText,
};
