const { createServer } = require('./createServer');
const DEFAULT_PORT = 5700;

const PORT = process.env.PORT || DEFAULT_PORT;

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});
