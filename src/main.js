const { createServer } = require('./createServer');
const { DEFAULT_PORT } = require('./config');

createServer().listen(DEFAULT_PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});
