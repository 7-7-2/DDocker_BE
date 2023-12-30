const loaders = require('./loaders');
const express = require('express');

const startServer = async () => {

    const app = express();
  
    await loaders({ expressApp: app });
  
    app.listen(process.env.PORT, err => {
      err ?
        console.log(err) : console.log(`SERVER_ON`);
    });
  }
  
startServer();