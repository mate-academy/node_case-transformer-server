const { validCases } = require('./validCases');
const { errorMessages } = require('./errorMessages');

const { noTextToConvert, noParams, invalidCase } = errorMessages;

function createMessage(message) {
  return { message: message };
}

function validate(textToConvert, toCase) {
  const response = {};
  const errors = [];

  const isInvalidCase = !validCases.includes(toCase);

  if (!textToConvert) {
    errors.push(createMessage(noTextToConvert));
  }

  if (!toCase) {
    errors.push(createMessage(noParams));
  }

  if (isInvalidCase && !!toCase) {
    errors.push(createMessage(invalidCase));
  }

  if (!errors.length) {
    response.valid = true;
  } else {
    response.statusCode = 400;
    response.statusText = 'Bad Request';
    response.valid = false;
    response.errors = errors;
  }

  return response;
}

module.exports = { validate };
