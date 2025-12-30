const sendResponse = (resObject, code, response) => {
  resObject.statusCode = code;
  resObject.end(JSON.stringify(response));
};

module.exports = {
  sendResponse,
};
