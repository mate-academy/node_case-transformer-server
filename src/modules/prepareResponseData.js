'use strict';

const prepareResponseData = (caughtErrors, result) => {
  if (caughtErrors.length) {
    return {
      statusCode: 400,
      statusText: 'Bad request',
      contentType: 'application/json',
      data: {
        errors: caughtErrors,
      },
    };
  }

  return {
    statusCode: 200,
    statusText: 'OK',
    contentType: 'application/json',
    data: result,
  };
};

module.exports = { prepareResponseData };
