const { Sequelize } = require('sequelize');
require('dotenv').config(); 

/**
 * config.sequelize
 * untuk menerapkan query ORM di main.js
 */
// Konfigurasi koneksi MySQL
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Mengecek koneksi MySQL menggunakan mysql2
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Mengecek koneksi Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Sequelize connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;


/*
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mvcnodedha'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});

connection.end();

connection.on('error', (err) => {
  console.error('MySQL connection error:', err);
});

connection.on('close', (err) => {
  console.log('MySQL connection closed:', err);
});

connection.on('end', () => {
  console.log('MySQL connection ended');
});
*/