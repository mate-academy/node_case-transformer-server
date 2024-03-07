/* eslint-disable no-console */
const { createServer } = require('./src/createServer');

createServer()
  .listen(5700, () => {
    console.log('Server started! 🚀');
  });
