const checkReq = (normalizedUrl, res) => {
  if (
    normalizedUrl.pathname === '/favicon.ico' ||
    normalizedUrl.pathname.startsWith('/.well-known/')
  ) {
    res.statusCode = 204;
    res.end();

    return true;
  }
};

module.exports = {
  checkReq,
};
