const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Kitapları listeleme
router.get('/', bookController.getAllBooks);

// Belirli bir kitabı görüntüleme
router.get('/:id', bookController.getBookById);

// Kitap ödünç verme işlemi
router.post('/:id/lend', bookController.lendBook);

module.exports = router;
