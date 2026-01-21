const axios = require('axios');

const href = 'http://localhost:5700/text?toCase=CAMEL';

console.log(href)

axios.get(href).catch(er => console.log(er));

