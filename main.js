const { PORT } = require('./src/constatnts');
const { createServer } = require('./src/createServer');

createServer()
  .listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server started! 🚀');
  });
