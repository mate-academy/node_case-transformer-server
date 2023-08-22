
/**
 * @typedef {Object} Arguments
 * @property {string} text
 * @property {string | null} toCase
 *
 * @param {NodeJS.Request} req
 *
 * @returns {Arguments}
 */

function readURL(req) {
  const [pathname, queryString] = req.url.split('?');
  const text = pathname.slice(1);

  const params = new URLSearchParams(queryString);
  const toCase = params.get('toCase');

  return {
    text,
    toCase,
  };
}

module.exports = {
  readURL,
};
