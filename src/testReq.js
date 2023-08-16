/*eslint-disable*/
const axios = require("axios");

const BASE = "http://localhost:5700";
const pathName = "/createServer?toCase=SNAKE";

const href = BASE + pathName;

axios.get(href).catch(() => console.log("ERROR"));
