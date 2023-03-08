const { createServer } = require('./src/createServer');

createServer()
  .listen(5700, () => {
    // eslint-disable-next-line no-console
    console.log('Server started! 🚀');
  });

module.exports = { createServer };
