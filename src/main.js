const { createServer } = require('./createServer');

const PORT = process.env.PORT || 5700;

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${PORT}! 🚀`);
});
