const loaders = require('./loaders');
const express = require('express');
const { PORT } = require('./config/index');

const startServer = async () => {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(PORT, err => {
    err ? console.log(err) : console.log(`SERVER_ON`);
  });
};

startServer();
