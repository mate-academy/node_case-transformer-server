const axios = require("axios")

const BASE = 'http://localhost:3000'
const pathname = '/createServer'
const search = '?toCase=SNAKE'
const href = process.argv[2] || BASE + pathname + search

axios.get(href)
  .then(response => console.log(response))
  .catch((error) => console.log(error))
