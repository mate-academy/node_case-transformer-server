'use strict';

function normalizeURL(url, port) {
  const BASE = `http://localhost:${port}`;
  const normalizedURL = new URL(url, BASE);
  const text = normalizedURL.pathname.slice(1);
  const param = normalizedURL.searchParams.get('toCase');

  return { text, param };
}

module.exports = normalizeURL;
