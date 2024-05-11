/* eslint-disable no-console */
const axios = require('axios');

const BASE_URL = 'http://localhost:5700';

const href = BASE_URL + '/PascalTest' + '?toCase=SsNAKE';

axios
  .get(href)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  });
