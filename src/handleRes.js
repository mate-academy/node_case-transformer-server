const { convertToCase } = require('./convertToCase');

function handleRes(text, urlCase, res) {
  if (!urlCase || !text) {
    throw Error();
  }

  const changedData = convertToCase(text, urlCase);

  res.end(JSON.stringify(
    {
      originalCase: changedData.originalCase,
      originalText: text,
      targetCase: urlCase,
      convertedText: changedData.convertedText,
    },
  ));
};

module.exports = { handleRes };
