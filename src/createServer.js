'use strict';
/* eslint-disable no-console */

const http = require('http');
const { convertToCase } = require('./convertToCase');
const { allowedCases } = require('./AllowedCases');
const { validationErrors } = require('./validationErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToTransform = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const validation = {
      errors: [],
    };

    if (!textToTransform) {
      validation.errors.push({
        message: validationErrors.missingTextToTransform,
      });
    }

    if (!toCase) {
      validation.errors.push({
        message: validationErrors.missingToCase,
      });
    }

    if (!(allowedCases.includes(toCase)) && toCase) {
      validation.errors.push({
        message: validationErrors.unUllowedCase,
      });
    }

    if (validation.errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify(validation));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(textToTransform, toCase);

    res.end(JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: textToTransform,
      convertedText,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
