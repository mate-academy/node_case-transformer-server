/* eslint-disable no-undef, max-len */
const { Server, get } = require('node:http');

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
    }).on('error', (err) => {
      reject(err);
    });
  });
}

describe('createServer', () => {
  let createServer;

  beforeAll(() => {
    createServer = require('../src/createServer').createServer;
  });

  describe('basic scenarios', () => {
    it('should create a server', () => {
      expect(createServer).toBeInstanceOf(Function);
    });

    it('should create an instance of Server', () => {
      expect(createServer()).toBeInstanceOf(Server);
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

    beforeAll(async () => {
      server = createServer();

      await listen(5701);
    });

    afterAll(() => {
      server.close();
    });

    describe('Users Module', () => {
      it('should return correct response for /users', async () => {
        const { body, res } = await request('/users');

        expect(res.headers['content-type']).toEqual('application/json');
        expect(res.statusCode).toBe(200);

        const data = JSON.parse(body);

        expect(data).toEqual({
          message: 'Users module reached',
          users: [],
        });
      });
    });

    describe('Expenses Module', () => {
      it('should return correct response for /expenses', async () => {
        const { body, res } = await request('/expenses');

        expect(res.headers['content-type']).toEqual('application/json');
        expect(res.statusCode).toBe(200);

        const data = JSON.parse(body);

        expect(data).toEqual({
          message: 'Expenses module reached',
          expenses: [],
        });
      });
    });

    describe('Unknown Routes', () => {
      it('should return 404 for unknown routes', async () => {
        const { body, res } = await request('/random');

        expect(res.headers['content-type']).toEqual('application/json');
        expect(res.statusCode).toBe(404);

        const data = JSON.parse(body);

        expect(data).toEqual({
          error: 'Route not found',
        });
      });
    });
  });
});
