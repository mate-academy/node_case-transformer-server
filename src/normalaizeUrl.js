'use strict';

function normalaizeUrl(url, host) {
  const normalaizedUrl = new URL(url, `http://${host}`);
  const textToConvert = normalaizedUrl.pathname.slice(1);
  const neededCase = normalaizedUrl.searchParams.get('toCase');

  return { textToConvert, neededCase };
}

module.exports = { normalaizeUrl };
