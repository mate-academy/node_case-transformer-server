const { convertToCase } = require('../convertToCase');
const prepareResponse = (response, requestData) => {
  const { originalText, targetCase } = requestData;

  const {
    originalCase,
    convertedText,
  } = convertToCase(originalText, targetCase);

  const resData = {
    originalCase,
    targetCase,
    originalText,
    convertedText,
  };

  response.data = JSON.stringify(resData);
};

const prepareBadResponse = (response, errors) => {
  response.statusCode = 400;
  response.statusMessage = 'Bad request';
  response.data = JSON.stringify({ errors });
};

module.exports = {
  prepareResponse,
  prepareBadResponse,
};
