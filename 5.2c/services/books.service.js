const Book = require('../models/bookModel');

// Get all books
const getAllBooks = async () => {
    return await Book.find({});
};

// Get one book using the custom id such as b1, b2 etc.
const getBookById = async (id) => {
    return await Book.findOne({ id: id });
};

module.exports = {
    getAllBooks,
    getBookById
};