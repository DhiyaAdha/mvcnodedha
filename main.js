//1. Inisiasi
require('dotenv').config();

const express = require('express');
const { engine, hbs } = require('express-handlebars');
const path = require('path');

// Db connection
const mysql = require('mysql2');
const sequelize = require('./db-config.js');
// console.log(sequelize);

//2. port express
const app = express();
const PORT = process.env.PORT || 4000;

/**
 * helpers handlebars express
 * pengguanan format handlebars
 * pengurutan nomor
 */
// Set up handlebars as the template engine
app.engine(
    'handlebars',
    engine({
      layoutsDir: path.join(__dirname, '/views/layouts'),
      defaultLayout: false,
      helpers: {
        getProperty: function (object, property) {
          return object[property];
        },
      },
    })
  );
app.set('view engine', 'handlebars');

const handlebars = require('handlebars');
const helpers = require('handlebars-helpers')();
handlebars.registerHelper(helpers);

// Middleware untuk mengakses req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * setup router
 * di server main.js
 */

// pages start
app.get('/', (req, res) => {
    res.send("hello world");
});

/**
 * pemanggilan router
 * connection dengan controllers
 */
const userRouter = require('./routes/router-user');
app.use('/', userRouter);

// Port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//finis v1