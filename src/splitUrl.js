function splitUrl(fullPath) {
  const urlParts = fullPath.split('?');
  const params = new URLSearchParams(urlParts[1]);

  const originalText = urlParts[0] === '/' ? '' : urlParts[0].slice(1);
  const targetCase = params.get('toCase');

  return { originalText, targetCase };
};

module.exports = { splitUrl };
