// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
import http from 'http';
import { convertToCase } from './convertToCase/convertToCase';

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const text = url.pathname.slice(1);
    const caseName = url.searchParams.get('toCase');

    if (!text || !caseName) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          error: 'Uso: /<text>?toCase=<SNAKE|KEBAB|CAMEL|PASCAL|UPPER>',
        }),
      );

      return;
    }

    try {
      const result = convertToCase(text, caseName.toUpperCase());

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Erro ao converter texto' }));
    }
  });

  return server;
}

module.exports = { createServer };
