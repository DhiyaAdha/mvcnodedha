const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
// const { getCustomUiPage } = require('../controllers/customUiController.js');

router.get('/users', userController.getAllUsers);
router.get('/create', userController.getCreatePage); 
router.post('/create', userController.createUser);

// Rute untuk mengarahkan ke halaman edit berdasarkan ID
router.get('/detail/:id', userController.redirectToDetailPage);
router.get('/edit/:id', userController.redirectToEditPage);
router.post('/users/:id', userController.updateUser);
router.post('/users/delete/:id', userController.deleteUserById);
router.get('/customui', userController.getCustomUiPage);

module.exports = router;