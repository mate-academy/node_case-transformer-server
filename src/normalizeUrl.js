'use strict';

function normalize(url, port) {
  const BASE = `http://localhost:${port}`;
  const normalizedUrl = new URL(url, BASE);
  const text = normalizedUrl.pathname.slice(1);
  const method = normalizedUrl.searchParams.get('toCase');

  return { text, method };
}

module.exports = normalize;
