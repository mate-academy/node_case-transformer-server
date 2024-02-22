function endResponseSuccessful(data, response) {
  response.statusCode = 200;

  response.end(data);
}

module.exports = { endResponseSuccessful };
