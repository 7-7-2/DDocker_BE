const loaders = require('./loaders');
const express = require('express');
const { PORT } = require('./config/index');

const startServer = async () => {
  const app = express();

  await loaders({ expressApp: app });

  const server = app.listen(PORT, err => {
    process.send('ready');
    err
      ? console.log(err)
      : console.log(`Application is listening on port ${PORT}...`);
  });
  app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
  });

  app.use((err, req, res, next) => {
    console.log('errorHandler caught following error:', err);
    res.status(err.status || 500).json({ message: err.message });
  });

  process.on('SIGINT', () => {
    server.close(() => {
      isDisableKeepAlive = true;
      console.log('Server closed');
      process.exit(0);
    });
  });
};

startServer();
