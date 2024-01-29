const { createServer } = require('./src/createServer');

createServer()
  .listen(process.env.PORT || 5700, () => {
    // eslint-disable-next-line no-console
    console.log('Server started! 🚀');
  });
