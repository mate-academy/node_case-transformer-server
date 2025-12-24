const { createServer } = require('./createServer.js');

createServer().listen(6688, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});
