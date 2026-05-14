const { DEFAULT_PORT } = require('../config');

/**
 * Reads `/<text>?toCase=NAME` from `req.url` (no validation).
 *
 * @param {import('http').IncomingMessage} req
 * @returns {{ text: string, toCase: string | undefined }}
 */
function parseConvertUrl(req) {
  const host = req.headers.host || `localhost:${DEFAULT_PORT}`;
  const base = `http://${host}`;
  const url = new URL(req.url, base);
  const text = url.pathname.slice(1);
  const params = Object.fromEntries(url.searchParams);

  return { text, toCase: params.toCase };
}

module.exports = {
  parseConvertUrl,
};
