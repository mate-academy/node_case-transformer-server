// const http = require('http');
const { createServer } = require('./createServer');

createServer().listen(5700, () => {
  // eslint-disable-next-line no-console
  console.log('Server started! 🚀');
});

// const options = {
//   hostname: 'localhost',
//   port: 5700,
//   path: '/',
//   method: 'GET',
// };

// const req = http.request(options, (res) => {
//   let data = '';

//   res.on('data', (chunk) => {
//     data += chunk;
//   });

//   res.on('end', () => {
//     console.log('Response:', data);
//   });
// });

// req.on('error', (error) => {
//   console.error('Error:', error);
// });

// req.end();
