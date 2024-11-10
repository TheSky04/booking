const prisma = require('../prisma/client');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        borrowedBooks: {
          include: {
            user: true
          }
        }
      }
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load books.' });
  }
};

// Get a specific book by ID
const getBookById = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        borrowedBooks: {
          include: {
            user: true
          }
        }
      }
    });

    if (!book) {
      return res.status(404).json({ status: 404, error: 'There is no book with that ID.' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve book details.' });
  }
};

// Lend a book
const lendBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  const { userId } = req.body;

  try {
    const existingBorrowedBook = await prisma.borrowedBook.findFirst({
      where: {
        bookId,
        returnedAt: null
      }
    });

    if (existingBorrowedBook) {
      return res.status(400).json({ status: 400, error: 'The book is already borrowed.' });
    }

    const borrowedBook = await prisma.borrowedBook.create({
      data: { userId, bookId, borrowedAt: new Date() }
    });
    res.status(201).json({ message: 'The book has been successfully borrowed.', borrowedBook });
  } catch (error) {
    res.status(500).json({ error: 'Failed to lend the book.' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  lendBook
};
