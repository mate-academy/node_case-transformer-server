/* eslint-disable max-len */

const { Server, get } = require('http');

function request(url = '/') {
  return new Promise((resolve, reject) => {
    get('http://localhost:5701' + url, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        resolve({ res, body });
      });
    })
      .on('error', (err) => {
        reject(err);
      });
  });
}

describe('createServer', () => {
  let createServer;

  before(() => {
    createServer = require('../src/createServer').createServer;
  });

  describe('basic scenarios', () => {
    it('should create a server', () => {
      expect(createServer)
        .toBeInstanceOf(Function);
    });

    it('should create an instance of Server', () => {
      expect(createServer())
        .toBeInstanceOf(Server);
    });
  });

  describe('Server', () => {
    let server;

    function listen(port) {
      return new Promise((resolve) => {
        server.listen(port, () => {
          resolve();
        });
      });
    }

    before(async() => {
      server = createServer();

      await listen(5701);
    });

    after(() => {
      server.close();
    });

    describe('Validation', () => {
      it('should throw correct error if no text to convert', async() => {
        const {
          body,
          res,
        } = await request('/?toCase=SNAKE');

        expect(res.headers['content-type'])
          .toEqual('application/json');

        const data = JSON.parse(body);

        expect(data)
          .toEqual({
            errors: [{
              message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            }],
          });
      });

      it('should throw correct error if no toCase', async() => {
        const {
          body,
          res,
        } = await request('/helloWorld');

        expect(res.headers['content-type'])
          .toEqual('application/json');

        const data = JSON.parse(body);

        expect(data)
          .toEqual({
            errors: [{
              message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            }],
          });
      });

      it('should throw correct error if toCase is invalid', async() => {
        const {
          body,
          res,
        } = await request('/helloWorld?toCase=invalid');

        expect(res.headers['content-type'])
          .toEqual('application/json');

        const data = JSON.parse(body);

        expect(data)
          .toEqual({
            errors: [{
              message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
            }],
          });
      });

      it('should throw correct error for empty URL', async() => {
        const {
          body,
          res,
        } = await request('/');

        expect(res.headers['content-type'])
          .toEqual('application/json');

        const data = JSON.parse(body);

        expect(data)
          .toEqual({
            errors: expect.arrayContaining([
              expect.objectContaining({
                message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
              }),
              expect.objectContaining({
                message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
              }),
            ]),
          });
      });

      it('should throw correct error if no text to convert and invalid toCase', async() => {
        const {
          body,
          res,
        } = await request('/?toCase=LOWER');

        expect(res.headers['content-type'])
          .toEqual('application/json');

        const data = JSON.parse(body);

        expect(data)
          .toEqual({
            errors:
            expect.arrayContaining([
              expect.objectContaining({
                message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
              }),
              expect.objectContaining({
                message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
              }),
            ]),
          });
      });
    });

    describe('Response', () => {
      const cases = {
        SNAKE: 'hello_world',
        KEBAB: 'hello-world',
        CAMEL: 'helloWorld',
        PASCAL: 'HelloWorld',
        UPPER: 'HELLO_WORLD',
      };

      Object.entries(cases).forEach(([toCase, expected]) => {
        Object.entries(cases).forEach(([originalCase, text]) => {
          it(`should convert ${originalCase} to ${toCase}`, async() => {
            const {
              body,
              res,
            } = await request(`/${text}?toCase=${toCase}`);

            expect(res.headers['content-type'])
              .toEqual('application/json');

            const data = JSON.parse(body);

            expect(data)
              .toEqual({
                originalCase,
                targetCase: toCase,
                convertedText: expected,
                originalText: text,
              });
          });
        });
      });
    });
  });
});
