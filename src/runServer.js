/* eslint-disable no-console */
const { createServer } = require('./createServer');

const PORT = 8080;

const server = createServer();

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
