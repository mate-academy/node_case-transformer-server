'use strict';

/**
 * @typedef {'SNAKE' | 'KEBAB' | 'CAMEL' | 'PASCAL' | 'UPPER'} CaseName
 *
 * @param {CaseName | undefined} param
 * @param {string} pathname
 *
 * @returns {Array<{ message: string }> | undefined}
 */

function isError(param, pathname) {
  const errors = [];
  const isAvailable = ['SNAKE' , 'KEBAB' , 'CAMEL' , 'PASCAL' , 'UPPER'].some((toCase) => toCase === param);

  if(!pathname) {
    errors.push({
      message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`
    })
  }

  if(!param) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`
    })
  }

  if(!isAvailable && param) {
    errors.push({
      message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`
    })
  }

  return errors.length ? errors : undefined;
}

module.exports = { isError };
