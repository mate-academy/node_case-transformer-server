const { convertToCase } = require('./convertToCase/convertToCase');

function respondPositively(url) {
  const givenUrl = new URL(url);
  const givenText = givenUrl.pathname.slice(1);
  const neededCase = givenUrl.searchParams.get('toCase');
  const { originalCase, convertedText } = convertToCase(givenText, neededCase);

  return {
    originalCase: originalCase,
    targetCase: neededCase,
    originalText: givenText,
    convertedText: convertedText,
  };
}

module.exports = {
  respondPositively,
};
