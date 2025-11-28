const { createServer: createHttpServer } = require('node:http');
const { usersController } = require('./modules/users/users.controller');
const {
  expensesController,
} = require('./modules/expenses/expenses.controller');

function createServer() {
  const server = createHttpServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = req.url || '/';
    const [path] = url.split('?');

    if (path.startsWith('/users')) {
      usersController(req, res);

      return;
    }

    if (path.startsWith('/expenses')) {
      expensesController(req, res);

      return;
    }

    res.statusCode = 404;
    res.statusMessage = 'Not Found';
    res.end(JSON.stringify({ error: 'Route not found' }));
  });

  return server;
}

module.exports = {
  createServer,
};
