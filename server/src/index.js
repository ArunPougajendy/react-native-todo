const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const debug = require('debug')('app:main');
const sls = require('serverless-http');

const port = 4000;
dotenv.config({ path: '.env' });
const dataBaseConfig = require('./config/database.js');
const { url, options } = dataBaseConfig[process.env.NODE_ENV];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const listRouter = require('./routes/list');

app.use('/todo', listRouter);

mongoose
  .connect(url, options)
  .then(() => {
    debug('connected to mongodb');
    if (process.env.NODE_ENV === 'development') {
      app.listen(port, () => {
        debug('The magic happens on port 4000');
      });
    }
  })
  .catch(err => debug(err));

module.exports.server = sls(app);
