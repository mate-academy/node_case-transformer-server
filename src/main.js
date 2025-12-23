const { createServer } = require('./createServer');
const { request } = require('./request');

createServer().listen(5700, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
  request();
});
