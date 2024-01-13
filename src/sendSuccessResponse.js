function sendSuccessResponse(res, result, targetCase, textToTransform) {
  const response = {
    originalCase: result.originalCase,
    targetCase,
    originalText: textToTransform,
    convertedText: result.convertedText,
  };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(response));
}

module.exports = { sendSuccessResponse };