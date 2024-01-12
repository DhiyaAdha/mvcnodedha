// controllers/userController.js

const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

// Contoh route untuk menampilkan daftar users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('index', { 
                title: 'Pages User',
                subTitle: 'Page Users',
                additionalInfo: 'Data Monitoring User',
            });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
