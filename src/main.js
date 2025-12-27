const dotenv = require('dotenv');
const { createServer } = require('./createServer');

dotenv.config();

const PORT = process.env.PORT || 5700;

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});
