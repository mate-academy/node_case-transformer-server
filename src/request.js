const http = require('node:http');

function request() {
  const textToConvert = 'HelloWorld';
  const caseType = 'SNAKE';
  const url = `http://localhost:5700/${textToConvert}?toCase=${caseType}`;

  const req = http.request(url, (res) => {
    res.setEncoding('utf8');

    res.on('data', (data) => {
      // eslint-disable-next-line no-console
      console.log(data);
    });
  });

  req.end();
}

module.exports = {
  request,
};
