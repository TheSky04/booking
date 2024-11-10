const prisma = require('../prisma/client');

// Tüm kullanıcıları listeleme
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcılar yüklenemedi.' });
  }
};

// Belirli bir kullanıcıyı görüntüleme
const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { borrowedBooks: true }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcı bilgileri getirilemedi.' });
  }
};

// Kitap ödünç alma
const borrowBook = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const bookId = parseInt(req.params.bookId);
  try {
    await prisma.borrowedBook.create({
      data: { userId, bookId, borrowedAt: new Date() }
    });
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ error: 'Kitap ödünç verilemedi.' });
  }
};

// Kitabı geri alma
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

module.exports = {
  getAllUsers,
  getUserById,
  borrowBook,
  returnBook
};
