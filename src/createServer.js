// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getErrors } = require('./getErrors');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normilizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToTransform = normilizedURL.pathname.slice(1);
    const typeToTransform = normilizedURL.searchParams.get('toCase');
    const errors = getErrors(textToTransform, typeToTransform);

    if (!errors.length) {
      const transformedData = convertToCase(textToTransform, typeToTransform);

      const response = {
        ...transformedData,
        targetCase: typeToTransform,
        originalText: textToTransform,
      };

      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(response));
      res.end();
    } else {
      const response = {
        errors,
      };

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.write(JSON.stringify(response));
      res.end();
    };
  });

  return server;
};

module.exports = {
  createServer,
};
