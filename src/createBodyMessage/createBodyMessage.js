const { createResponse } = require('./createResponse');
const caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const correctRequest = '/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>';
const missingText = `Text to convert is required. Correct request is: "${correctRequest}".`;
const missingToCase = `"toCase" query param is required. Correct request is: "${correctRequest}".`;
const notFromList = `This case is not supported. Available cases: ${caseTypes.join(', ')}.`;

function createErrorMessage(recivedText, recivedCase, res) {
  res.statusCode = 400;

  const errorMessage = {
    errors: [
    ],
  };

  if (!caseTypes.includes(recivedCase) && recivedCase) {
    errorMessage.errors.push({ message: notFromList });
  }

  if (!recivedCase) {
    errorMessage.errors.push({ message: missingToCase });
  }

  if (!recivedText) {
    errorMessage.errors.push({ message: missingText });
  };

  return errorMessage;
}

function createBodyMessage(recivedText, recivedCase, res) {
  const isError = !caseTypes.includes(recivedCase)
 || !recivedCase || !recivedText;

  if (isError) {
    const errorData = JSON.stringify(createErrorMessage(recivedText,
      recivedCase, res));

    return errorData;
  };

  const responseMessage = JSON.stringify(createResponse(recivedText,
    recivedCase, res));

  return responseMessage;
}

module.exports = { createBodyMessage };
