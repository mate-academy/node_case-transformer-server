const dotenv = require('dotenv');

dotenv.config();

const { createServer } = require('./src/createServer');

createServer()
  .listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server started! 🚀');
  });
