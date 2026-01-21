const { convertToCase } = require('../convertToCase');

const getSuccessfulResponse = (response, textToConvert, caseToChange) => {
  const convertedResponse = convertToCase(textToConvert, caseToChange);

  response.statusCode = 200;
  response.statusText = 'OK';

  const formattedResponse = {
    originalCase: convertedResponse.originalCase,
    targetCase: caseToChange,
    originalText: textToConvert,
    convertedText: convertedResponse.convertedText,
  };

  response.end(JSON.stringify(formattedResponse));
};

module.exports = { getSuccessfulResponse };
