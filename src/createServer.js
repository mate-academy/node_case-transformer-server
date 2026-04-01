// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
import http from 'http';
import { convertToCase } from './convertToCase/convertToCase';
export function createServer() {
  const server = http.createServer((r, s) => {
    s.setHeader('Content-Type', 'application/json');
    const word = r.url.split('?')[0].replace('/', '');
    const params = new URLSearchParams(r.url.split('?')[1]);
    const toCase = params.get('toCase');
    if (!word) {
      s.statusCode = 400;
      return s.end(
        JSON.stringify({
          errors: [
            {
              message:
                'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            },
          ],
        }),
      );
    } else if (!toCase) {
      s.statusCode = 400;
      return s.end(
        JSON.stringify({
          errors: [
            {
              message:
                '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            },
          ],
        }),
      );
    } else if (
      toCase !== 'SNAKE' &&
      toCase !== 'KEBAB' &&
      toCase !== 'CAMEL' &&
      toCase !== 'PASCAL' &&
      toCase !== 'UPPER'
    ) {
      s.statusCode = 400;
      return s.end(
        JSON.stringify({
          errors: [
            {
              message:
                'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
            },
          ],
        }),
      );
    }
    // conteudo principal
    s.statusCode = 200;
    s.end(
      JSON.stringify({
        originalCase: convertToCase(word, toCase).originalCase,
        targetCase: toCase,
        originalText: word,
        convertedText: convertToCase(word, toCase).convertedText,
      }),
    );
  });
  return server;
}
