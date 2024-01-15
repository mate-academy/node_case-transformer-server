const { createServer } = require('./src/createServer');


const PORT = process.env.PORT || 5700;


createServer()
  .listen(PORT, () => {
    console.log('Server started! 🚀');
  });
