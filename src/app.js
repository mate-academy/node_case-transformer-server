/* eslint-disable no-console */
const { createServer } = require('./createServer');

const PORT = process.env.PORT || 3000;

const server = createServer();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
