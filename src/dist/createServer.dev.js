'use strict';

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  if (
    !(
      Symbol.iterator in Object(arr) ||
      Object.prototype.toString.call(arr) === '[object Arguments]'
    )
  ) {
    return;
  }
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
var http = require('http');

var _require = require('./convertToCase'),
  convertToCase = _require.convertToCase;

var SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  var server = http.createServer(function (req, res) {
    var _req$url$split = req.url.split('?'),
      _req$url$split2 = _slicedToArray(_req$url$split, 2),
      textPart = _req$url$split2[0],
      queryString = _req$url$split2[1];

    var text = textPart.slice(1);
    var params = new URLSearchParams(queryString);
    var toCase = params.get('toCase');
    var errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(
        JSON.stringify({
          errors: errors,
        }),
      );
      return;
    }

    var _convertToCase = convertToCase(text, toCase),
      originalCase = _convertToCase.originalCase,
      convertedText = _convertToCase.convertedText;

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(
      JSON.stringify({
        originalCase: originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: convertedText,
      }),
    );
  });
  return server;
}

module.exports = {
  createServer: createServer,
};
