const { createServer } = require('./src/createServer');

function main() {
  const server = createServer();
  const port = process.env.PORT || 5701;

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${port}`);

    server.setTimeout(() => {
      server.end();
    }, 500);
  });
}

module.exports = { main };
