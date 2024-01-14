const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/users', userController.getAllUsers);
router.get('/create', userController.getCreatePage); 
router.post('/create', userController.createUser);

// Rute untuk mengarahkan ke halaman edit berdasarkan ID
router.get('/detail/:id', userController.redirectToDetailPage);
router.get('/edit/:id', userController.redirectToEditPage);
router.post('/users/:id', userController.updateUser);
// Rute untuk menghapus pengguna berdasarkan ID
router.post('/users/delete/:id', userController.deleteUserById);

module.exports = router;