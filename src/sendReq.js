function sendReq(res, req) {
  return res.end(JSON.stringify(req));
}

module.exports = {
  sendReq,
};
