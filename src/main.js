const { createServer } = require('./createServer');

createServer().listen(5702, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});
