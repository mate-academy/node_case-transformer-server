/* eslint-disable no-console */
const http = require('http');
const notification = require('./notifications')
const { convertToCase } = require('./convertToCase');
const { log } = require('console');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const toCase = searchParams.get('toCase');
    const textToConvert = pathname.slice(1);
    const errorNotifications = {
      errors: [],
    };

    res.setHeader('Content-Type', 'application/json');

    if (!textToConvert) {
      errorNotifications.errors.push({
        message: notification.textMissing,
      });
    }

    if (!toCase) {
      errorNotifications.errors.push({
        message: notification.toCaseMissing,
      });
    }

    if (!supportedCases.includes(toCase)) {
      errorNotifications.errors.push({
        message: notification.toCaseNotExist,
      });
    }

    console.log('errorNotifications', errorNotifications);

    if (errorNotifications.errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));
    }

    const response = {
      ...convertToCase(textToConvert, toCase),
      targetCase: toCase,
      originalText: textToConvert,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(response));
  });

  return server;
};


module.exports = {
  createServer,
};





