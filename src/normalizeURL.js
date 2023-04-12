'use strict';

function normalizeURL(url, base) {
  return new URL(url, base);
}

module.exports = { normalizeURL };
