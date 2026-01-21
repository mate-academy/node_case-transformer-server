const { createServer } = require('./createServer');

createServer().listen(8080, 'localhost', () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});
