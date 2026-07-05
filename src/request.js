const http = require('http');

const PORT = process.env.PORT || 5700;

const textToConvert = 'writeFile';
const caseType = 'UPPER';

const url = `http://localhost:${PORT}/${textToConvert}?toCase=${caseType}`;

const req = http.request(url, (res) => {
  res.setEncoding('utf8');

  // підписуємось на отримання частини даних відповіді
  res.on('data', (data) => {
    // обробляємо частину даних відповіді
    // eslint-disable-next-line no-console
    console.log(data);
  });
});

// підписуємось на будь-яку помилку запиту
req.on('error', (error) => {
  // обробляємо помилку
  // eslint-disable-next-line no-console
  console.log(error);
});

// надсилаємо запит
req.end();
