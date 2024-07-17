const { createServer } = require('./createServer');
// const http = require('http');

createServer().listen(5700, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});
