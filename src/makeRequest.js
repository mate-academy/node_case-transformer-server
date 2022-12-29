const axios = require('axios');
const BASE_URL = 'http://localhost:8080';

const path = '/createServer?toCase=';

const href = BASE_URL + path;

axios.get(href)
  .then(res => {
    console.log(res.status);

    console.log(res.data);
  })
  .catch(error => {
    console.error('Error');
  });
