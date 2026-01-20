function throwError(res, ...messages) {
  res.statusCode = 400;
  res.setHeader('Content-Type', 'application/json');

  res.end(
    JSON.stringify({
      errors: messages.map((message) => ({ message })),
    }),
  );
}

module.exports = {
  throwError,
};
