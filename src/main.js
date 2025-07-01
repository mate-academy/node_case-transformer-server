const { createServer } = require('./createServer');

if (require.main === module) {
  createServer().listen(5700, () => {});
}
