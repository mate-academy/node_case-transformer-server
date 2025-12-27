const axios = require('axios');
const { CASES } = require('./src/constants');

const PORT = process.env.PORT || 5700;
const BASE_URL = `http://localhost:${PORT}`;
const textToConvert = 'createServer';
const href = `${BASE_URL}/${textToConvert}?toCase=${CASES.UPPER}`;

axios
  .get(href)
  .then((response) => {
    // eslint-disable-next-line no-console
    console.log('Response:', response.data);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log('Error:', err.response ? err.response.data : err);
  });
