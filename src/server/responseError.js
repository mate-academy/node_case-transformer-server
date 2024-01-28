const responseError = (res, errors) => {
  res.setHeader('Content-Type', 'application/json');

  res.statusCode = 400;

  res.end(JSON.stringify({ errors }));
};

module.exports = responseError;
