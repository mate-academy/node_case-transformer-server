function parseRequest(req) {
  const splittedUrl = req.url.split('?');
  const originalText = splittedUrl[0].slice(1);
  const targetCase = new URLSearchParams(splittedUrl[1]).get('toCase');

  return { originalText, targetCase };
}
exports.parseRequest = parseRequest;
