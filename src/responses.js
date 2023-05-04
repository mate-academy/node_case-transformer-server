function respondWithError(res, errors) {
  res.statusCode = 400;
  res.statusMessage = 'Bad request';
  res.setHeader('Content-Type', 'application/json');

  const payload = {
    errors: errors.map(error => ({ message: error })),
  };

  res.end(JSON.stringify(payload, null, 2));
}

function respondWithConversionResult(res, conversionInfo) {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');

  res.end(JSON.stringify(conversionInfo, null, 2));
}

module.exports = {
  respondWithError,
  respondWithConversionResult,
};
