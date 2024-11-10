const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Kullanıcıları listeleme
router.get('/', userController.getAllUsers);

// Belirli bir kullanıcıyı görüntüleme
router.get('/:id', userController.getUserById);

// Kitap ödünç alma
router.post('/:userId/borrow/:bookId', userController.borrowBook);

// Kitabı geri alma
router.post('/:userId/return/:bookId', userController.returnBook);

module.exports = router;
