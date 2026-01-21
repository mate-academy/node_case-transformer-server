const { createServer } = require('./createServer');
const DEFAULT_PORT = process.env.PORT || 5700;
const server = createServer();

server.listen(DEFAULT_PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});
