/* eslint-disable no-console */
const { createServer } = require('./createServer');

const PORT = 5700;

createServer().listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀`);
  console.log(`Available at http://localhost:${PORT}`);
});
