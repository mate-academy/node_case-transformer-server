/**
 * @param {NodeJS.Response} res
 * @param {number} statusCode
 * @param {any} data
 */
function sendResponse(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;

  res.end(JSON.stringify(data));
}

module.exports = {
  sendResponse,
};
