const responseOk = (res, result, toCase, text) => {
  res.setHeader('Content-Type', 'application/json');

  res.statusCode = 200;

  res.end(JSON.stringify({
    originalCase: result.originalCase,
    targetCase: toCase,
    originalText: text,
    convertedText: result.convertedText,
  }));
};

module.exports = responseOk;
