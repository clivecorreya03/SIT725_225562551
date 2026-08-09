const Book = require('../models/bookModel');

const getAllBooks = async () => {
    return await Book.find({});
};

const getBookById = async (id) => {
    return await Book.findOne({ id });
};

const createBook = async (bookData) => {
    const book = new Book(bookData);
    return await book.save();
};

const updateBook = async (id, updateData) => {
    return await Book.findOneAndUpdate(
        { id },
        updateData,
        {
            new: true,
            runValidators: true
        }
    );
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook
};