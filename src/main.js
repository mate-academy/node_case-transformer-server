const { createServer } = require('./createServer');

createServer().listen(1000, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});
