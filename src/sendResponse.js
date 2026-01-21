const {convertToCase} = require("./convertToCase");

function sendResponse(errors, res, text, toCase) {
  if (errors.length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    res.statusText = 'Bad request';

    const errorResponse = {
      errors,
    };

    res.end(JSON.stringify(errorResponse));
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const result = convertToCase(text, toCase);
    const formattedResponse = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(formattedResponse));
  }
}

module.exports = {
  sendResponse,
}
