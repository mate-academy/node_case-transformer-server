const { createServer } = require('./createServer');
const PORT = 5007;

createServer().listen(PORT, () => {});
