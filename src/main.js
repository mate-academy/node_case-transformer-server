const { createServer, PORT } = require('./createServer');

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is ruNNіng on http://localhost:${PORT}`);
});
