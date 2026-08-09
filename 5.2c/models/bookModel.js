const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },

    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    },

    genre: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        get: value => {
            return value ? value.toString() : null;
        }
    }
});

// Make Decimal128 getter work when sending JSON
bookSchema.set('toJSON', {
    getters: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;