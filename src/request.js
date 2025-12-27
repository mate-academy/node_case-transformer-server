const http = require('http');

const TEXT_TO_CONVERT = 'KekwAbleToConvertYopta';
const CASE_NAME = 'SNAKE';
const href = `/${TEXT_TO_CONVERT}?toCase=${CASE_NAME}`;
const request = http.request(`http://localhost:3006${href}`, (res) => {
  res.setEncoding('utf8');
  console.log(res.headers);

  res.on('data', (data) => {
    // обробляємо частину даних відповіді
    console.log(data);
  });

  res.on('headers', (data) => {
    // обробляємо частину даних відповіді
    console.log(data);
  });
});

request.on('error', (error) => {
  // обробляємо помилку
  console.log(error);
});

request.end();
