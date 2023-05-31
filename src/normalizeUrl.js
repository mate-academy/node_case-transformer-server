'use strict';

function normalizeUrl(requestUrl, requestHost) {
  const normalizedUrld = new URL(requestUrl, `http://${requestHost}`);
  const toCase = normalizedUrld.searchParams.get('toCase');
  const textToConvert = normalizedUrld.pathname.slice(1);

  return { toCase, textToConvert };
}

module.exports = { normalizeUrl };
