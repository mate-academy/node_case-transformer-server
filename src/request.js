/* eslint-disable no-console */
const axios = require('axios');

axios
  .get('http://localhost:5700/createServer?toCase=SNAKE')
  .then(() => console.log('Success request!'))
  .catch((err) => console.log(err));
