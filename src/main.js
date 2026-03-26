const { createServer } = require('./createServer');

// const PORT = process.env.PORT || 5700;

createServer().listen(5700, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});
