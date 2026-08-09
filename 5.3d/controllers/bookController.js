const bookService = require('../services/books.service');

const CREATE_FIELDS = [
    'id',
    'title',
    'author',
    'year',
    'genre',
    'summary',
    'price'
];

const UPDATE_FIELDS = [
    'title',
    'author',
    'year',
    'genre',
    'summary',
    'price'
];

const findUnknownFields = (body, allowedFields) => {
    return Object.keys(body).filter(
        field => !allowedFields.includes(field)
    );
};

const validationMessages = error => {
    if (!error || !error.errors) {
        return ['Validation failed'];
    }

    return Object.values(error.errors).map(
        item => item.message
    );
};


// GET /api/books
const getAllBooks = async (req, res) => {
    try {

        const books = await bookService.getAllBooks();

        res.status(200).json({
            developedBy: 's225562551',
            data: books
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


// GET /api/books/:id
const getBookById = async (req, res) => {
    try {

        const book = await bookService.getBookById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json({
            developedBy: 's225562551',
            data: book
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


// POST /api/books
const createBook = async (req, res) => {
    try {

        const unknownFields =
            findUnknownFields(req.body, CREATE_FIELDS);

        if (unknownFields.length > 0) {
            return res.status(400).json({
                message: 'Unexpected fields are not allowed',
                fields: unknownFields
            });
        }

        const createdBook =
            await bookService.createBook(req.body);

        res.status(201).json({
            developedBy: 's225562551',
            data: createdBook
        });

    } catch (error) {

        // duplicate id
        if (error && error.code === 11000) {
            return res.status(409).json({
                message: 'A book with this id already exists'
            });
        }

        // mongoose validation
        if (error && error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationMessages(error)
            });
        }

        // malformed Decimal128 etc.
        if (error && error.name === 'CastError') {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error(error);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


// PUT /api/books/:id
const updateBook = async (req, res) => {
    try {

        // id must not be supplied during update
        if (Object.prototype.hasOwnProperty.call(req.body, 'id')) {
            return res.status(400).json({
                message: 'Book id is immutable and cannot be changed'
            });
        }

        const unknownFields =
            findUnknownFields(req.body, UPDATE_FIELDS);

        if (unknownFields.length > 0) {
            return res.status(400).json({
                message: 'Unexpected fields are not allowed',
                fields: unknownFields
            });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: 'At least one update field is required'
            });
        }

        const updatedBook =
            await bookService.updateBook(
                req.params.id,
                req.body
            );

        if (!updatedBook) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json({
            developedBy: 's225562551',
            data: updatedBook
        });

    } catch (error) {

        if (error && error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationMessages(error)
            });
        }

        if (error && error.name === 'CastError') {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error(error);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook
};