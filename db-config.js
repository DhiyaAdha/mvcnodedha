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

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('UserDB', null, null, {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// module.exports = sequelize;