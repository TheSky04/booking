const prisma = require('../prisma/client');

// Tüm kitapları listeleme
const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Kitaplar yüklenemedi.' });
  }
};

// Belirli bir kitabı görüntüleme
const getBookById = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: { borrowedBooks: true }
    });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Kitap bilgileri getirilemedi.' });
  }
};

// Kitap ödünç verme işlemi
const lendBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  const { userId } = req.body;
  try {
    const borrowedBook = await prisma.borrowedBook.create({
      data: { userId, bookId }
    });
    res.json({ message: 'Kitap ödünç verildi', borrowedBook });
  } catch (error) {
    res.status(500).json({ error: 'Kitap ödünç verilemedi.' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  lendBook
};
