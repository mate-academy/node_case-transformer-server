const getFailedResponse = (response, errors) => {
  const errorResponse = {
    errors,
  };

  response.statusCode = 400;
  response.statusText = 'Bad request';

  response.end(JSON.stringify(errorResponse));
};

module.exports = { getFailedResponse };
