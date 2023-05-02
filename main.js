const { createServer } = require('./src/createServer');
const { printMessage } = require('./src/printMessage');

createServer()
  .listen(5700, () => {
    printMessage('Server started! 🚀');
  });
