const { convertToCase } = require('./convertToCase/convertToCase');

const handlingData = (text, caseName, res) => {
  if (text === '' || caseName === null) {
    throw Error();
  }

  if (caseName !== null) {
    const obj = convertToCase(text, caseName);

    res.end(JSON.stringify(
      {
        convertedText: obj.convertedText,
        originalCase: obj.originalCase,
        originalText: text,
        targetCase: caseName,
      },
      null,
      2,
    ));
  }
};

module.exports = { handlingData };
