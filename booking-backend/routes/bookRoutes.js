const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');

router.get('/', bookController.getAllBooks);

router.get('/:id', bookController.getBookById);

router.post('/:userId/return/:bookId', userController.returnBook);

router.delete('/clear-bookings', bookController.clearBorrowedBooks);

module.exports = router;
