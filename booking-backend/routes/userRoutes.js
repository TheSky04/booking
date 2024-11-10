const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Kullanıcıları listeleme
router.get('/', userController.getAllUsers);

// Belirli bir kullanıcıyı görüntüleme
router.get('/:id', userController.getUserById);

// Belirli bir kullanıcıya ait kitabı geri alma
router.post('/:id/return', userController.returnBook);

// Kitap ödünç alma işlemi
router.post('/:userId/borrow/:bookId', userController.borrowBook);

// Kitap iade etme işlemi
router.post('/:userId/return/:bookId', userController.returnBook);

const returnBook = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId);
    const { score } = req.body; // Kullanıcı tarafından verilen puan
  
    try {
      await prisma.borrowedBook.updateMany({
        where: { userId, bookId, returnedAt: null },
        data: { returnedAt: new Date(), rating: score }
      });
      res.status(204).send(); // No Content
    } catch (error) {
      res.status(500).json({ error: 'Kitap iade edilemedi.' });
    }
  };
  

module.exports = router;


