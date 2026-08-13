const { createServer } = require('./createServer');

const server = createServer();
const PORT = 5700;

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}! 🚀`);
});
