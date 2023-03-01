const { parseRequest } = require('./parseRequest');
const { validateRequestData } = require('./validateRequestData');
const { prepareBadResponse, prepareResponse } = require('./prepareResponse');
const requestListener = (req, res) => {
  const requestData = parseRequest(req);
  const errors = validateRequestData(requestData);

  if (errors.length) {
    prepareBadResponse(res, errors);
  } else {
    prepareResponse(res, requestData);
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(res.data);
};

module.exports = { requestListener };
