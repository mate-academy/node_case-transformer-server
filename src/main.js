const { createServer } = require('./createServer');

const server = createServer();

const PORT = 5700;

server.listen(PORT, () => {
  return `Server is running on http://localhost:${PORT}`;
});
