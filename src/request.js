/* eslint-disable no-console */
const axios = require('axios');

const BASE = 'http://localhost:3000';
const pathName = '/createServer';
const search = '?toCase=SNAKE';

const href = BASE + pathName + search;

console.log(href);

axios.get(href)
  .catch(() => console.log('Error occurred'));
