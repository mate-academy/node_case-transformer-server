'use strict';

const generateErrorResponse = (...messages) => {
  const erorrResponse = {
    errors: [],
  };

  for (const message of messages) {
    if (message) {
      erorrResponse.errors.push(message);
    }
  }

  return JSON.stringify(erorrResponse, null, 2);
};

module.exports = { generateErrorResponse };
