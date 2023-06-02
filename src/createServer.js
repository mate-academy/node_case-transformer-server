const http = require('http');
const { validate } = require('./convertToCase/validate');
const { convertToCase } = require('./convertToCase/convertToCase');
const { data } = require('./convertToCase/data');

function createServer() {
    const server = http.createServer((req, res) => {
      const { text, toCase } = data(req);
      const errors = validate(text, toCase);
  
      res.setHeader('Content-Type', 'application/json');
  
      if (errors.length) {
        res.statusCode = 400;
        res.statusMessage = 'Bad Request';
  
        return res.end(JSON.stringify({ errors }));
      }
  
      res.statusCode = 200;
      res.statusMessage = 'OK';
  
      const {
        originalCase,
        convertedText,
      } = convertToCase(text, toCase);
  
      return res.end(JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      }));
    });
  
    return server;
  }
  
  module.exports = {
    createServer,
  };