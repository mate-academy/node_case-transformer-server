const { createServer } = require('./createServer');

const PORT = process.argv.PORT || 5700;

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});
