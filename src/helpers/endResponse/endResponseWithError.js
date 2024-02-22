function endResponseWithError({ errors }, response) {
  response.statusCode = 200;
  response.statusMessage = 'Bad request';

  const responsePayload = {
    errors: errors.map(({ message }) => ({ message })),
  };

  response.end(JSON.stringify(responsePayload));
}

module.exports = { endResponseWithError };
