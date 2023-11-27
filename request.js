const axios = require('axios');

const href = 'http://localhost:5700/text?toCase=camel';

axios.get(href).catch(er => console.log(er));
