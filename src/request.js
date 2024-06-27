const axios = require('axios');

const BASE = 'http://localhost:5700';
const href = `${BASE}/textToConvert?toCase=SNAKE`;

axios
  .get(href)
  .then((response) => {
    // console.log(response.data);
  })
  .catch((error) => {
    throw new Error(error);
  });
