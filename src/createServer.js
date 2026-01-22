/* eslint-disable no-console */
'use strict';

const http = require('http');
const { ERROR, ALL_CASES } = require('./constant');
const { errorHandler, successHandler } = require('./helpers');

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizeURL = new URL(req.url, `http://${req.headers.host}`);
    const params = new URLSearchParams(normalizeURL.searchParams);
    const textToTranslate = normalizeURL.pathname.slice(1);
    const toCase = params.get('toCase')?.toLocaleUpperCase();
    const errors = [];

    res.setHeader('Content-type', 'application/json');

    if (!textToTranslate.length) {
      errors.push({ message: ERROR.MISSING_TEXT });
    }

    if (!toCase) {
      errors.push({ message: ERROR.MISSING_TO_CASE });
    } else if (!ALL_CASES[toCase]) {
      errors.push({ message: ERROR.MISSING_CASE_VALUE });
    }

    if (errors.length) {
      errorHandler({ res, errors });
    } else {
      successHandler({ res, textToTranslate, toCase });
    }
  });
};

module.exports = { createServer };
