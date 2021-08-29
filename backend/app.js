const express = require("express");

const app = express();

app.use('/posts', (req,res,next) => {
  res.send('hello from express');
});

module.exports = app;


