const { createServer } = require('./createServer');
const { PORT } = require('./convertToCase/constans');

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});
