/* eslint-disable no-console */
const { createServer } = require('./createServer');

const PORT = 5700;

createServer().listen(PORT, () => {
  console.log('Server started! 🚀');
});
