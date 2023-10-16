const { createServer } = require("./src/createServer");

const PORT = process.env.PORT || 8080;

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started http://localhost:${PORT}  ! 🚀`);
});
