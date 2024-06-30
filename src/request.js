const axios = require('axios');

const BASE = 'http://localhost:5700';
const API = `${BASE}/textToConvert?toCase=SNAKE`;

axios
  .get(API)
  .then((resp) => {
    // console.log(resp.data);
  })
  .catch((err) => {
    throw new Error(err);
  });
