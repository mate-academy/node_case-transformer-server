const { createServer } = require('./src/createServer');
const PORT = process.env.PORT;
const server = createServer();

server.listen(PORT);
