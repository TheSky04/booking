const prisma = require('../prisma/client');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();

    const transformedBooks = books.map(book => ({
      id: book.id,
      name: book.title,
    }));

    res.json(transformedBooks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books.' });
  }
};

// Get a specific book by ID
const getBookById = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        borrowedBooks: true,
      },
    });

    if (!book) {
      return res.status(404).json({status:'404', error: 'Book not found with that ID.' });
    }

    const totalRatings = book.borrowedBooks.reduce((acc, item) => acc + (item.rating || 0), 0);
    const ratingCount = book.borrowedBooks.filter(item => item.rating !== null).length;
    const averageScore = ratingCount > 0 ? (totalRatings / ratingCount).toFixed(2) : -1;

    const transformedBook = {
      id: book.id,
      name: book.title,
      score: averageScore,
    };

    res.json(transformedBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book details.' });
  }
};

// Lend a book
const returnBook = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const bookId = parseInt(req.params.bookId);
  const { score } = req.body;

  try {
    const updatedBorrowedBook = await prisma.borrowedBook.updateMany({
      where: { userId, bookId, returnedAt: null },
      data: { returnedAt: new Date(), rating: score },
    });

    if (updatedBorrowedBook.count === 0) {
      return res.status(404).json({ error: 'Borrowed book record not found or already returned' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to return the book.' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  returnBook
};
