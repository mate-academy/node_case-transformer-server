const { convertToCase } = require('./convertToCase/index');

const handleData = (urlText, urlCase, res) => {
  if (!urlText.length || !urlCase.length) {
    throw Error();
  }

  const result = convertToCase(urlText, urlCase);

  res.writeHead(200);

  res.end(JSON.stringify(
    {
      convertedText: result.convertedText,
      originalCase: result.originalCase,
      originalText: urlText,
      targetCase: urlCase,
    },
  ));
};

module.exports = { handleData };
