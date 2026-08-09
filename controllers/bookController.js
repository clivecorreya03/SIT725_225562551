// Import the books service
const bookService = require('../services/books.service');

// Return all books
exports.getAllBooks = (req, res) => {
  const books = bookService.getAllBooks();

  res.json({
    status: 200,
    data: books,
    message: 'Books retrieved using service'
  });
};

// Return one book by ID
exports.getBookById = (req, res) => {
  const book = bookService.getBookById(req.params.id);

  if (!book) {
    return res.status(404).json({
      status: 404,
      data: null,
      message: 'Book not found'
    });
  }

  return res.json({
    status: 200,
    data: book,
    message: 'Book retrieved using service'
  });
};