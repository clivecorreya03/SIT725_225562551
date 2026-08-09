const mongoose = require('mongoose');

const currentYear = new Date().getFullYear();

const bookSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Book id is required'],
        trim: true,
        unique: true,
        minlength: [2, 'Book id must contain at least 2 characters'],
        maxlength: [30, 'Book id must not exceed 30 characters'],
        match: [
            /^b[a-zA-Z0-9_-]+$/,
            'Book id must start with b and contain only letters, numbers, underscores or hyphens'
        ]
    },

    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [2, 'Title must contain at least 2 characters'],
        maxlength: [120, 'Title must not exceed 120 characters']
    },

    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        minlength: [2, 'Author must contain at least 2 characters'],
        maxlength: [100, 'Author must not exceed 100 characters']
    },

    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [1000, 'Year must be 1000 or later'],
        max: [currentYear, `Year cannot be later than ${currentYear}`],
        validate: {
            validator: Number.isInteger,
            message: 'Year must be a whole number'
        }
    },

    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true,
        minlength: [2, 'Genre must contain at least 2 characters'],
        maxlength: [50, 'Genre must not exceed 50 characters']
    },

    summary: {
        type: String,
        required: [true, 'Summary is required'],
        trim: true,
        minlength: [10, 'Summary must contain at least 10 characters'],
        maxlength: [1000, 'Summary must not exceed 1000 characters']
    },

    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'Price is required'],
        validate: {
            validator: function (value) {
                if (!value) return false;

                const numberValue = Number(value.toString());

                return (
                    Number.isFinite(numberValue) &&
                    numberValue > 0 &&
                    numberValue <= 10000
                );
            },
            message: 'Price must be greater than 0 and no more than 10000 AUD'
        },
        get: value => value ? value.toString() : null
    }
});

bookSchema.set('toJSON', {
    getters: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        return ret;
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;