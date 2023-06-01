const axios = require('axios');

axios.get('http://localhost:3000/?callback=callback')
  .then(res => {
    console.log(res.status);

    console.log(res.data);
  })
  .catch(err => console.log(err));
