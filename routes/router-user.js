const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// display books page
router.get('/', function(req, res, next) {

    dbConn.query('SELECT * FROM books ORDER BY id desc',function(err,rows)     {

        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('books',{data:''});
        } else {
            // render to views/books/index.ejs
            res.render('books',{data:rows});
        }
    });
});

module.exports = router;