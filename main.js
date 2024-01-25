const { createServer } = require('./src/createServer.js');

createServer()
  .listen(5700, () => {
    // eslint-disable-next-line no-console
    console.log('Server started! 🚀');
  });
