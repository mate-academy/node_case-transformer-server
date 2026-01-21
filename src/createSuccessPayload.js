const { convertToCase } = require('./convertToCase/convertToCase');

function createSuccessPayload(url) {
  const BASE = 'http://localhost:5700';

  const normalizedUrl = new URL(url, BASE);

  const pathname = normalizedUrl.pathname.slice(1);

  const targetCase = normalizedUrl.searchParams.get('toCase');
  const { originalCase, convertedText } = convertToCase(pathname, targetCase);

  const payload = {
    originalCase: originalCase,
    targetCase: targetCase,
    originalText: pathname,
    convertedText: convertedText,
  };

  return payload;
}

module.exports = { createSuccessPayload };
