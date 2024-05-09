const statusCodes = {
  BAD_REQUEST: 400,
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
};

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

module.exports = {
  statusCodes,
  supportedCases,
};
