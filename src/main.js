const { createServer } = require('./createServer');

const server = createServer();

server.listen(5700, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});
