/* eslint no-console: ["error", { allow: ["log"] }] */
const axios = require('axios');

const BASE = 'http://localhost:8080';
const [textToConvert, caseName] = process.argv.slice(2);
const href = BASE + `/${textToConvert}?toCase=${caseName}`;

axios.get(href).catch((error) => {
  console.log(error);
});
