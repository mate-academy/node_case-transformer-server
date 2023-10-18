// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
// import convertToCase

// - snake_case (`SNAKE`)
// - kebab-case (`KEBAB`)
// - camelCase (`CAMEL`)
// - PascalCase (`PASCAL`)
// - UPPER_CASE (`UPPER`)

// const PORT = process.env.PORT || 5000;

// const params = new URLSearchParams(queryString);
// const toCase = params.get('toCase');

function createServer() {

const server = http.createServer((request, response) => {

  const [pathname, queryString] = req.url.split("?")

  console.log(pathname)
  console.log(queryString)
  // const urlNormalize = new URL(request.url, `http://${request.headers.host}`)

  // 1. Parsowanie textu z URL -> string to konwersji + sposób konwersji
  // 2. Import convertToCase i użycie tej funkcji aby przekonwertować i zwrócić text
  // 3. Obługa błędów wg instrukcji

  response.end('OK!');


})

return server
}
module.exports = {
  createServer
}


