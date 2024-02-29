const { createServer } = require('./src/createServer');
const axios = require('axios');

const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const QUERY_PARAMS = process.env.QUERY_PARAMS;
const TEXT_TO_CONVERT = process.env.TEXT_TO_CONVERT;

createServer
  .listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server started! 🚀');
  });

axios.get(BASE_URL + PORT + '/' + TEXT_TO_CONVERT + QUERY_PARAMS);
// axios.get(BASE_URL + PORT);
