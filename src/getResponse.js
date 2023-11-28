const getResponse = (response, code, body) => {
  switch (code) {
    case 400:
      response.statusCode = 400;
      response.statusMessage = 'Bad request';
      response.end(JSON.stringify(body));

      break;
    case 200:
      response.statusCode = 200;
      response.statusMessage = 'OK';
      response.end(JSON.stringify(body));
      break;
  }
};

module.exports = {
  getResponse,
};
