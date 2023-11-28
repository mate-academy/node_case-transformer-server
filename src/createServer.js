// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { validate } = require('./validate')
const { convertToCase } = require('./convertToCase/convertToCase')
const createServer = () => {
    return http.createServer((req, res) => {
        const normalizedUrl = new URL(req.url, 'http://localhost:5700')
        const caseStyle = normalizedUrl.searchParams.get('toCase')
        const originalText = normalizedUrl.pathname.slice(1)
        errorRes = validate(originalText, caseStyle);

        console.log(errorRes)

        res.setHeader('Content-Type', 'application/json');

        if (errorRes.errors.length) {

            res.statusCode = 400;
            res.end(JSON.stringify(errorRes));
        }

        if (!errorRes.errors.length) {
            res.statusCode = 200;
            const { originalCase, convertedText } = convertToCase(originalText, caseStyle);

            const resu = {
                "originalCase": originalCase,
                "targetCase": caseStyle,
                "originalText": originalText,
                "convertedText": convertedText
            }

            res.end(JSON.stringify(resu))
        }
    })
}

module.exports = {
    createServer,
};
