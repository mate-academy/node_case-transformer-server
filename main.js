const { createServer } = require('./src/createServer');

createServer()
  .listen(5700, () => {
    global.console.log('Server started! 🚀');
  });
