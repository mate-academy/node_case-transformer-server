const http = require('http');
const PORT = process.env.PORT || 3000;

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
    const parts = parsedUrl.pathname.split('/').filter(Boolean);
    const query = Object.fromEntries(parsedUrl.searchParams.entries());

    const response = {
      parts,
      query,
    };

    res.end(JSON.stringify(response));
  });
}

const server = createServer();

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = { createServer };
