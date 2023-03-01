const http = require('http');
const { requestListener } = require('./requestListener');

const createServer = () => http.createServer(requestListener);

module.exports = { createServer };
