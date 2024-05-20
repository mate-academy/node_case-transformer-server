const { createServer } = require('./createServer');

createServer().listen(5701, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});
