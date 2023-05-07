// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require("http")
const { validate } = require("./convertToCase/validate")
const { convertToCase } = require("./convertToCase/convertToCase")

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  const { pathname, searchParams} = new URL(req.url, `http://${req.headers.host}`)
  const originalText = pathname.slice(1)
  const targetCase = searchParams.get('toCase')
  const errors = validate(originalText, targetCase)

  if (!errors.length) {
    const result = convertToCase(originalText, targetCase)
    res.statusCode = 200
    res.statusMessage = 'OK'
    console.log(result)
    res.write(JSON.stringify(result))
  } else {
    res.statusCode = 400
    res.statusMessage = 'Bad request'
    console.log(errors)
  }

  res.end()
})

// Enables the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

