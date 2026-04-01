// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
import http from 'http';
import { convertToCase } from './convertToCase/convertToCase';
export function createServer() {
  const server = http.createServer((r, s) => {
    const url = r.url.split('?');
    if (url[1] === undefined) {
      return;
    }
    const word = url[0].replace('/', '');
    if (url[1].includes('UPPER')) {
      return convertToCase(word, 'UPPER');
    } else if (url[1].includes('KEBAB')) {
      return convertToCase(word, 'KEBAB');
    } else if (url[1].includes('CAMEL')) {
      return convertToCase(word, 'CAMEL');
    } else if (url[1].includes('PASCAL')) {
      return convertToCase(word, 'PASCAL');
    } else if (url[1].includes('SNAKE')) {
      return convertToCase(word, 'SNAKE');
    }
    s.end('ok');
  });
  return server;
}
