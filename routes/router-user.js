const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/users', userController.getAllUsers);
router.get('/create', userController.getCreatePage); 
router.post('/create', userController.createUser);

router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;