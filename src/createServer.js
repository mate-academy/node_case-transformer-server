const http = require('http');
const { checkError } = require('./checkErrors.js');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const PORT = 3001;

const createServer = () => {
  return http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    const userUrl = req.url;

    const url = new URL(userUrl, `http://${req.headers.host}`)
    const text = url.pathname.slice(1);
    const caseName = url.searchParams.get('toCase');

    console.log({ text, caseName })

    const errorMessages = checkError(text, caseName);

    console.log({ errorMessages })


    if (errorMessages.length !== 0) {
      res.statusCode = 400
      res.statusMessage = `Bad request`

      res.end(JSON.stringify({ errors: errorMessages }))
    } else {
      res.statusCode = 200

      const { originalCase, convertedText } = convertToCase(text, caseName)

      res.end(JSON.stringify({
        originalCase,
        targetCase: caseName,
        originalText: text,
        convertedText,
      })

      )
    }
  })
}

createServer().listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})

module.exports = { createServer }

