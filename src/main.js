const { createServer } = require('./createServer');

/* eslint-disable no-console */
const server = createServer();

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
/* eslint-enable no-console */
