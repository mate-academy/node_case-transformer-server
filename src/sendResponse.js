const { convertToCase } = require('./convertToCase');

const sendResponse = (errorsCheck, textToConvert, toCase, res) => {
  if (errorsCheck.errors.length) {
    res.end(JSON.stringify(errorsCheck));
  } else {
    const result = convertToCase(textToConvert, toCase);

    const response = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(response));
  }
};

module.exports = { sendResponse };
