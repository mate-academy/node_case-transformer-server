const { createServer, BASE } = require('./createServer');

createServer().listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! at: 🚀', BASE);
});
