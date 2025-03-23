const { newServer } = require('./createServer');
// const { createServer } = require('./createServer');

newServer().listen(5700, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});
