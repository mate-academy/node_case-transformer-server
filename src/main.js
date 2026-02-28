const { createServer } = require('./createServer');

createServer().listen(5700, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀' + ' http://localhost:5700');
});
