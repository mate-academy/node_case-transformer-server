const { createServer } = require('./createServer');

const PORT = process.env.PORT || 5700;
const HOST = 'localhost';

createServer().listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://${HOST}:${PORT} 🚀`);
});
