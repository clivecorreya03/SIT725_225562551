const bookService = require('../services/books.service');

// GET /api/books
const getAllBooks = async (req, res) => {

    try {

        const books = await bookService.getAllBooks();

        res.status(200).json({
            data: books
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error retrieving books'
        });
    }
};


// GET /api/books/:id
const getBookById = async (req, res) => {

    try {

        const id = req.params.id;

        const book = await bookService.getBookById(id);

        if (!book) {

            return res.status(404).json({
                message: 'Book not found'
            });

        }

        res.status(200).json({
            data: book
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error retrieving book'
        });
    }
};


module.exports = {
    getAllBooks,
    getBookById
};