const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');

// Kitapları listeleme
router.get('/', bookController.getAllBooks);

// Belirli bir kitabı görüntüleme
router.get('/:id', bookController.getBookById);

// Kitap ödünç verme işlemi
router.post('/:userId/return/:bookId', userController.returnBook);

module.exports = router;
