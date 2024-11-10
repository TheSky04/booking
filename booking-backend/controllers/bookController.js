const prisma = require('../prisma/client');

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
      return res.status(404).json({ error: 'Book not found' });
    }

    const ratedBorrowedBooks = book.borrowedBooks.filter(record => record.rating !== null);
    const totalScore = ratedBorrowedBooks.reduce((sum, record) => sum + (record.rating || 0), 0);
    const score = ratedBorrowedBooks.length > 0 ? (totalScore / ratedBorrowedBooks.length).toFixed(2) : -1;

    const currentOwner = book.borrowedBooks.find(record => record.returnedAt === null)?.user || null;

    const response = {
      id: book.id,
      name: book.title,
      score: score,
      author: book.author,
      year: book.year,
      currentOwner: currentOwner ? { id: currentOwner.id, name: currentOwner.name } : null // Kullanıcı objesini ekler
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ error: 'An error occurred while fetching the book details' });
  }
};

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

const clearBorrowedBooks = async (req, res) => {
  try {
    await prisma.borrowedBook.deleteMany();
    res.status(200).json({ message: 'All records in borrowedBooks table have been cleared.' });
  } catch (error) {
    console.error('Error clearing borrowedBooks table:', error);
    res.status(500).json({ error: 'Failed to clear the borrowedBooks table.' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  returnBook,
  clearBorrowedBooks
};
