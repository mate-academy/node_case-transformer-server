function sendErrorResponse(res, errors) {
  res.statusCode = 400;
  res.statusMessage = 'Bad Request';
  res.setHeader('Content-Type', 'application/json');

  const errorResponse = {
    errors,
  };

  // console.log(errorResponse);

  res.end(JSON.stringify(errorResponse));
}

module.exports = {
  sendErrorResponse,
};
