function parseParams(req) {
  const splittedUrl = req.url.split('?');
  const originalText = splittedUrl[0].slice(1);
  const targetCase = new URLSearchParams(splittedUrl[1]).get('toCase');

  return { originalText, targetCase };
}

module.exports = parseParams;
