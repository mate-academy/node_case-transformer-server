'use strict';

function normalizeUrl(requestUrl, requestHost) {
  const normalizedUrl = new URL(requestUrl, `http://${requestHost}`);
  const toCase = normalizedUrl.searchParams.get('toCase');
  const textToConvert = normalizedUrl.pathname.slice(1);

  return { toCase, textToConvert };
}

module.exports = { normalizeUrl };
