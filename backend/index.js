const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { json } = require("react-router-dom");
const authroutes = require('./routes/routes');
const cokkieparser = require('cookie-parser');

const server = express();
server.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
server.use(express.json());
server.use(cokkieparser());


mongoose
  .connect("mongodb://localhost:27017/mihir")
  .then(() => {
    console.log("mongoose connect");
  })
  .catch((err) => {
    console.log("mongoose not connect", err);
  });

  server.use('/', authroutes);

server.listen(8000, () => {
  console.log("serverstarted");
});
