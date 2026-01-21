/* eslint-disable no-console */
const { createServer } = require('./createServer');
const PORT = 5700;

createServer().listen(5700, () => {
  console.log('Server started! 🚀');
  console.log(`Listening on http://localhost:${PORT}`);
});
