const { createServer } = require('./createServer');

createServer().listen(5700, () => {
  // eslint-disable-next-line no-console, no-template-curly-in-string
  console.log(`Server started! 🚀 `);
});
