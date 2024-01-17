'use strict';

const { default: axios } = require("axios");

const BASE = 'http://localhost:5700';

const href = BASE + '/jell';

console.log(href);

axios.get(href)
  .then(data=> console.log(data.data))
  .catch(err => console.log(err));

