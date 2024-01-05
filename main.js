const { createServer, PORT } = require('./src/createServer');

createServer()
  .listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on http://localhost:${PORT}`);
  });
