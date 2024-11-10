const prisma = require('../prisma/client');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load users.' });
  }
};

const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { borrowedBooks: { include: { book: true } } }
    });

    if (!user) {
      return res.status(404).json({ status: 404, error: 'There is no user with that ID.' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user details.' });
  }
};

// Borrow a book
const borrowBook = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const bookId = parseInt(req.params.bookId);
  try {
    const bookExists = await prisma.book.findUnique({ where: { id: bookId } });
    if (!bookExists) {
      return res.status(404).json({ status: 404, error: 'There is no book with that ID.' });
    }

    await prisma.borrowedBook.create({
      data: { userId, bookId, borrowedAt: new Date() }
    });
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ error: 'Failed to borrow the book.' });
  }
};

// Return a book
const returnBook = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const bookId = parseInt(req.params.bookId);
  const { score } = req.body; // User-provided score

  try {
    const borrowedBook = await prisma.borrowedBook.findFirst({
      where: { userId, bookId, returnedAt: null }
    });

    if (!borrowedBook) {
      return res.status(404).json({ status: 404, error: 'No active borrowed record found for this book and user.' });
    }

    await prisma.borrowedBook.update({
      where: { id: borrowedBook.id },
      data: { returnedAt: new Date(), rating: score }
    });
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ error: 'Failed to return the book.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  borrowBook,
  returnBook
};
