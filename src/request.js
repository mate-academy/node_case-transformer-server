/* eslint-disable no-console */
import axios from 'axios';
// import http from 'http';

const url = 'http://localhost:3000/someText?toCase=UPPER';

axios
  .get(url)
  .then((res) => console.log(res.data))
  .catch((err) => {
    console.error('Error:', err.message);
  });

// http
//   .get(url, (res) => {
//     let data = '';

//     res.on('data', (chunk) => {
//       data += chunk;
//     });

//     res.on('end', () => {
//       console.log('Status code:', res.statusCode);

//       try {
//         const json = JSON.parse(data);

//         console.log('JSON:', json);
//       } catch (e) {
//         console.log('Response text:', data);
//       }
//     });
//   })
//   .on('error', (err) => {
//     console.error('Request error:', err.message);
//   });
