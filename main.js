//1. Inisiasi
require('dotenv').config();

const express = require('express');
const { engine, hbs } = require('express-handlebars');
const path = require('path');

// Db connection
const mysql = require('mysql2');
const sequelize = require('./db-config.js');
// console.log(sequelize);

// const session = require('express-session');

//2. port express
const app = express();
const PORT = process.env.PORT || 4000;

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

// Middleware untuk mengakses req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * setup router
 * di server main.js
 */

// pages start
app.get('/welcome', (req, res) => {
    res.send("hello world");
});

/**
 * pemanggilan router
 * connection dengan controllers
 */
const userRouter = require('./routes/router-user');
app.use('/', userRouter);


const handlebars = require('handlebars');
const helpers = require('handlebars-helpers')();

handlebars.registerHelper(helpers);

// app.get('/users', async  (req, res) => {
//     try {
//         const users = await sequelize.query('SELECT * FROM user ORDER BY id DESC', { type: sequelize.QueryTypes.SELECT });
//         console.log(users);
//         res.render('index', { 
//             title: 'Pages User',
//             subTitle: 'Page Users',
//             additionalInfo: 'Data Monitoring User',
//             users: users,
//         });
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

/*
*fungsi router awal(1)
app.get('/users', async  (req, res) => {
    try {
        const users = await sequelize.query('SELECT * FROM user ORDER BY id DESC', { type: sequelize.QueryTypes.SELECT });
        console.log(users);
        res.render('index', { 
            title: 'Pages User',
            subTitle: 'Page Users',
            additionalInfo: 'Data Monitoring User',
            users: users,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// page create
app.get('/create_users', (req, res) => {
    res.render('create', { 
        title: 'Page Create',
        subTitle: 'Page Create',
        additionalInfo: 'Tambah User',
    });
});

// pages detail
app.get('/detail_users', (req, res) => {
    res.render('detail_update', { 
        title: 'Page Details',
        subTitle: 'Page Detail',
        additionalInfo: 'Detail & Update User', });
});

*/

// Port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Check database
// console.log(mysql);
/*
fungsi migration & seeder
automation input data
dengan sequelize 
*/

// sequelize.sync()
//   .then(() => {
//     console.log('Database and tables are in sync.');
//   })
//   .catch((err) => {
//     console.error('Error syncing database:', err);
//   });

// Gunakan userController sebagai middleware
// app.use('/users', userController);

